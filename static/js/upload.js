(function($) {

	// 当domReady的时候开始初始化
	$(function() {
		var $wrap = $('#uploader'),
      chunks,

			// 文件容器
			$queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList')),

			// 状态栏，包括进度和控制按钮
			$statusBar = $wrap.find('.statusBar'),

			// 文件总体选择信息。
			$info = $statusBar.find('.info'),

			// 上传按钮
			$upload = $wrap.find('.uploadBtn'),

			// 没选择文件之前的内容。
			$placeHolder = $wrap.find('.placeholder'),

			$progress = $statusBar.find('.progress').hide(),

			//服务器路径
			serverRootUrl = 'http://192.168.100.139:8080',
			checkMd5 = serverRootUrl + '/userfile/check_md5',
      checkUrl = serverRootUrl + '/userfile/check',
      checkMerge = serverRootUrl + '/userfile/merge',
			uploadUrl = serverRootUrl + '/userfile/upload',

			// 添加的文件数量
			fileCount = 0,

			// 添加的文件总大小
			fileSize = 0,

			// 优化retina, 在retina下这个值是2
			ratio = window.devicePixelRatio || 1,

			// 缩略图大小
			thumbnailWidth = 110 * ratio,
			thumbnailHeight = 110 * ratio,

			// 可能有pedding, ready, uploading, confirm, done.
			state = 'pedding',

			// 所有文件的进度信息，key为file id
			percentages = {},

			// 判断浏览器是否支持图片的base64
			isSupportBase64 = (function() {
				var data = new Image();
				var support = true;
				data.onload = data.onerror = function() {
					if(this.width != 1 || this.height != 1) {
						support = false;
					}
				}
				data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				return support;
			})(),

			// 检测是否已经安装flash，检测flash的版本
			flashVersion = (function() {
				var version;
				try {
					version = navigator.plugins['Shockwave Flash'];
					version = version.description;
				} catch(ex) {
					try {
						version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
							.GetVariable('$version');
					} catch(ex2) {
						version = '0.0';
					}
				}
				version = version.match(/\d+/g);
				return parseFloat(version[0] + '.' + version[1], 10);
			})(),

			supportTransition = (function() {
				var s = document.createElement('p').style,
					r = 'transition' in s ||
					'WebkitTransition' in s ||
					'MozTransition' in s ||
					'msTransition' in s ||
					'OTransition' in s;
				s = null;
				return r;
			})(),

			// WebUploader实例
			uploader,
			//设置分片大小
			chunkSize = 2 * 1024 * 1024,
			// 文件名、文件MD5、文件大小、表单数据
			fileName, fileMd5, fileSize, formData;

		//不支持flash，并且是ie浏览器
		if(!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {
			// flash 安装了但是版本过低。
			if(flashVersion) {
				(function(container) {
					window['expressinstallcallback'] = function(state) {
						switch(state) {
							case 'Download.Cancelled':
								alert('您取消了更新！')
								break;

							case 'Download.Failed':
								alert('安装失败')
								break;

							default:
								alert('安装已成功，请刷新！');
								break;
						}
						delete window['expressinstallcallback'];
					};

					var swf = '../images/expressInstall.swf';
					// insert flash object
					var html = '<object type="application/' +
						'x-shockwave-flash" data="' + swf + '" ';

					if(WebUploader.browser.ie) {
						html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
					}

					html += 'width="100%" height="100%" style="outline:0">' +
						'<param name="movie" value="' + swf + '" />' +
						'<param name="wmode" value="transparent" />' +
						'<param name="allowscriptaccess" value="always" />' +
						'</object>';

					container.html(html);

				})($wrap);
				// 压根就没有安转。
			} else {
				$wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
			}
			return;
		} else if(!WebUploader.Uploader.support()) {
			alert('Web Uploader 不支持您的浏览器！');
			return;
		}

		WebUploader.Uploader.register({
			'name': 'webUploaderHookCommand',
			'before-send-file': 'beforeSendFile',
			"before-send": "beforeSend",
      "after-send-file": "afterSendFile"
		}, {
			beforeSendFile: function(file) {
        var parentid = sessionStorage.getItem('parentid');
        chunks = Math.ceil(file.size/chunkSize);
				var task = new WebUploader.Deferred();
				fileName = file.name;
				fileSize = (file.size/1024/1024).toFixed(2);
				(new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function(percentage) {}).then(function(val) {
					fileMd5 = val;
					var url = checkMd5;
					var data = {
					  name: fileName,
						mdValue: fileMd5,
						size: fileSize,
            parentId:parentid
					};
					$.ajax({
						type: "POST",
            headers:{
              'Authorization': sessionStorage.getItem('userToken')
            },
						url: url,
						data: data,
            beforeSend: function(request) {
              request.setRequestHeader("Authorization", sessionStorage.getItem('userToken'));
            },
						cache: false,
						async: false, // 同步
						timeout: 1000, // todo 超时的话，只能认为该分片未上传过
						dataType: "json",
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							file.statusText = 'server_error';
							task.reject();
						}
					}).then(function(data, textStatus, jqXHR) {
            console.log(data);
            // if(data.rtn == 0) {
							if(data.data.result == 1) {
								task.reject();
								uploader.skipFile(file);
							} else {
								task.resolve();
							}
						// } else {
						// 	task.reject();
						// }
					});
				});
				return task.promise();
			},
			beforeSend: function(block) {
        var task = new WebUploader.Deferred();
				var url = checkUrl;
				var data = {
					name: fileName,
					chunk: block.chunk,
					size: block.end - block.start,
          chunks:chunks
				};
				$.ajax({
					type: "POST",
          headers:{
            'Authorization': sessionStorage.getItem('userToken')
          },
					url: url,
					data: data,
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem('userToken'));
          },
					cache: false,
					async: false, // 同步
					timeout: 1000, // todo 超时的话，只能认为该分片未上传过
					dataType: "json",
				}).then(function(data, textStatus, jqXHR) {
          console.log(data);
          if(data.data.result == 1) {
						task.reject(); // 分片存在，则跳过上传
					} else {
						task.resolve();
					}
				});
				this.owner.options.formData.fileMd5 = fileMd5;
				this.owner.options.formData.chunkSize = chunkSize;
				return task.promise();
			},
      afterSendFile:function(file){
        var parentid = sessionStorage.getItem('parentid');
			  var chunksTotal = Math.ceil(file.size/chunkSize);
        var task = new WebUploader.Deferred();
        (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function(percentage) {}).then(function(val) {
          fileMd5 = val;
          var url = checkMerge;
          var data = {
            name: file.name,
            chunks: chunksTotal,
            size: file.size,
            fileMd5:fileMd5
          };
          $.ajax({
            type: "POST",
            headers:{
              'Authorization': sessionStorage.getItem('userToken')
            },
            url: url + '/' + parentid,
            data: data,
            timeout: 5000,
            beforeSend: function(request) {
              request.setRequestHeader("Authorization", sessionStorage.getItem('userToken'));
            },
            cache: false,
            async: false,  // 同步
            dataType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              file.statusText = 'server_error';
              task.reject();
            }
          }).then(function (data, textStatus, jqXHR) {
            // 业务逻辑...
            console.log(data);
            if (data.status){
              task.resolve();
            } else {
              task.reject();
              file.statusText = '';
            }
          });
        });
        return task.promise();
      }
		});

		// 实例化
		uploader = WebUploader.create({
			pick: {
				id: '#filePicker',
				label: '点击选择文件'
			},
			formData: {
				uid: 123
			},
			dnd: '#dndArea', //指定文件拖拽的区域
			paste: '#uploader', //指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为document.body.
			swf: '../webuploader/Uploader.swf',
			chunked: true,
			chunkSize: chunkSize,
			chunkRetry: false,
			threads: 1,
			server: uploadUrl,
			// runtimeOrder: 'flash',
      headers:{
        'Authorization': sessionStorage.getItem('userToken')
      },

			// accept: {
			//     title: 'Images',
			//     extensions: 'gif,jpg,jpeg,bmp,png',
			//     mimeTypes: 'image/*'
			// },
			// 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
			disableGlobalDnd: true,
			fileNumLimit: 300 //限制多文件上传的个数
			//fileSizeLimit: 200 * 1024 * 1024, // 限制所有文件的大小 200 M
			//fileSingleSizeLimit: 50 * 1024 * 1024 // 限制单个文件的大小 50 M
		});

		// 拖拽时校验
		uploader.on('dndAccept', function(items) {
			//			var denied = false,len = items.length,i = 0,unAllowed = 'text/plain;application/javascript ';
			//			for(; i < len; i++) {
			//				if(~unAllowed.indexOf(items[i].type)) {
			//					denied = true;
			//					break;
			//				}
			//			}
			//			return !denied;
			return true;
		});

		//当一批文件添加进队列以后触发
		// uploader.on('filesQueued', function() {
		//     uploader.sort(function( a, b ) {
		//         if ( a.name < b.name )
		//           return -1;
		//         if ( a.name > b.name )
		//           return 1;
		//         return 0;
		//     });
		// });

		// 添加“添加文件”的按钮，
		uploader.addButton({
			id: '#filePicker2',
			label: '继续添加'
		});

		//uploader实例化执行
		uploader.on('ready', function() {
			window.uploader = uploader;
		});

		function gen_html_li(file) {
			var $li = $('<li id="' + file.id + '" title="' + file.name + '">' +
				'<p class="title">' + file.name + '</p>' +
				'<p class="imgWrap"></p>' +
				'<p class="progress"><span></span></p>' +
				'</li>')
			return $li;
		}

		function gen_html_btns(li) {
		  $btns = $('<div class="file-panel">' +
				'<span class="cancel">删除</span>' +
				'<span class="rotateRight">向右旋转</span>' +
				'<span class="rotateLeft">向左旋转</span></div>').appendTo(li);
			return $btns;
		}

		function getErrorText(code) {
			var text;
			switch(code) {
				case 'exceed_size':
					text = '文件大小超出';
					break;

				case 'interrupt':
					text = '上传暂停';
					break;
				case 'file_existed':
					text = '文件已存在';
					break;
				case 'server_error':
					text = '服务器异常';
					break;
				default:
					text = '上传失败，请重试';
					break;
			}
			return text;
		}

		// 当有文件添加进来时执行，负责view的创建
		function addFile(file) {
			var $li = gen_html_li(file),
				$btns = gen_html_btns($li),
				$prgress = $li.find('p.progress span'),
				$wrap = $li.find('p.imgWrap'),
				$info = $('<p class="error"></p>'),
				showError = function(code) {
					var text = getErrorText(code);
					$info.text(text).appendTo($li);
				};
			if(file.getStatus() === 'invalid') {
				showError(file.statusText);
			} else {
				// @todo lazyload
				$wrap.text('预览中');
				//生成缩略图
				uploader.makeThumb(file, function(error, src) {
					var img;
					if(error) {
						$wrap.text('不能预览');
						return;
					}
					if(isSupportBase64) {
						img = $('<img src="' + src + '">');
						$wrap.empty().append(img);
					} else {
						//浏览器不支持base64，生成缩略图需要做处理
						$.ajax('../../server/preview.php', {
							method: 'POST',
							data: src,
							dataType: 'json'
						}).done(function(response) {
							if(response.result) {
								img = $('<img src="' + response.result + '">');
								$wrap.empty().append(img);
							} else {
								$wrap.text("预览出错");
							}
						});
					}
				}, thumbnailWidth, thumbnailHeight);

				percentages[file.id] = [file.size, 0];
				file.rotation = 0;
			}

			//监控文件的状态变化
			file.on('statuschange', function(cur, prev) {
				if(prev === 'progress') {
					$prgress.hide().width(0);
				} else if(prev === 'queued') {
					$li.off('mouseenter mouseleave');
					$btns.remove();
				}
				// 成功
				if(cur === 'error' || cur === 'invalid') {
					showError(file.statusText);
					percentages[file.id][1] = 1;
				} else if(cur === 'interrupt') {
					showError('interrupt');
				} else if(cur === 'queued') {
					percentages[file.id][1] = 0;
				} else if(cur === 'progress') {
					$info.remove();
					$prgress.css('display', 'block');
				} else if(cur === 'complete') {
					$li.append('<span class="success"></span>');
					$(".error").remove();
				}
				$li.removeClass('state-' + prev).addClass('state-' + cur);
			});

			$li.on('mouseenter', function() {
				$btns.stop().animate({
					height: 30
				});
			});

			$li.on('mouseleave', function() {
				$btns.stop().animate({
					height: 0
				});
			});

			$btns.on('click', 'span', function() {
				var index = $(this).index(),
					deg;
				switch(index) {
					case 0:
						uploader.removeFile(file);
						return;
					case 1:
						file.rotation += 90;
						break;
					case 2:
						file.rotation -= 90;
						break;
				}

				if(supportTransition) {
					deg = 'rotate(' + file.rotation + 'deg)';
					$wrap.css({
						'-webkit-transform': deg,
						'-mos-transform': deg,
						'-o-transform': deg,
						'transform': deg
					});
				} else {
					$wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
					// use jquery animate to rotation
					// $({
					//     rotation: rotation
					// }).animate({
					//     rotation: file.rotation
					// }, {
					//     easing: 'linear',
					//     step: function( now ) {
					//         now = now * Math.PI / 180;

					//         var cos = Math.cos( now ),
					//             sin = Math.sin( now );

					//         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
					//     }
					// });
				}

			});
			$li.appendTo($queue);
		}

		// 负责view的销毁
		function removeFile(file) {
			var $li = $('#' + file.id);
			delete percentages[file.id];
			updateTotalProgress();
			$li.off().find('.file-panel').off().end().remove();
		}

		function updateTotalProgress() {
			var loaded = 0,
				total = 0,
				spans = $progress.children(),
				percent;
			$.each(percentages, function(k, v) {
				total += v[0];
				loaded += v[0] * v[1];
			});
			percent = total ? loaded / total : 0;
			spans.eq(0).text(Math.round(percent * 100) + '%');
			spans.eq(1).css('width', Math.round(percent * 100) + '%');
			updateStatus();
		}

		function updateStatus() {
			var text = '',
				stats;
			if(state === 'ready') {
				text = '选中' + fileCount + '个文件，共' + WebUploader.formatSize(fileSize) + '。';
			} else if(state === 'confirm') {
				stats = uploader.getStats();
				if(stats.uploadFailNum) {
					text = '已成功上传' + stats.successNum + '个文件，' + stats.uploadFailNum + '个文件上传失败了，<a class="retry" href="#">重新上传</a>失败文件或忽略'
				}
			} else {
				stats = uploader.getStats();
				text = '共' + fileCount + '个（' + WebUploader.formatSize(fileSize) + '），已上传' + stats.successNum + '个';
				if(stats.uploadFailNum) {
					text += '，失败' + stats.uploadFailNum + '个';
				}
			}
			$info.html(text);
		}

		function setState(val) {
			var file, stats;
			if(val === state) {
				return;
			}
			$upload.removeClass('state-' + state);
			$upload.addClass('state-' + val);
			state = val;

			switch(state) {
				case 'pedding':
					$placeHolder.removeClass('element-invisible');
					$queue.hide();
					$statusBar.addClass('element-invisible');
					uploader.refresh();
					break;
				case 'ready':
					$placeHolder.addClass('element-invisible');
					$('#filePicker2').removeClass('element-invisible');
					$queue.show();
					$statusBar.removeClass('element-invisible');
					uploader.refresh();
					break;
				case 'uploading':
					$('#filePicker2').addClass('element-invisible');
					$progress.show();
					$upload.text('暂停上传');
					break;
				case 'paused':
					$progress.show();
					$upload.text('继续上传');
					break;
				case 'confirm':
					$progress.hide();
					$('#filePicker2').removeClass('element-invisible');
					$upload.text('开始上传');

					stats = uploader.getStats();
					if(stats.successNum && !stats.uploadFailNum) {
						setState('finish');
						return;
					}
					break;
				case 'finish':
					stats = uploader.getStats();
					if(stats.successNum) {
						alert('上传成功');
					} else {
						// 没有成功的图片，重设
						state = 'done';
						location.reload();
					}
					break;
			}
			updateStatus();
		}

		//上传过程中触发，携带上传进度
		uploader.onUploadProgress = function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress span');
			$percent.css('width', percentage * 100 + '%');
			percentages[file.id][1] = percentage;
			updateTotalProgress();
		};

		//当文件被加入队列以后触发
		uploader.onFileQueued = function(file) {
			fileCount++;
			fileSize += file.size;
			if(fileCount === 1) {
				$placeHolder.addClass('element-invisible');
				$statusBar.show();
			}
			addFile(file);
			setState('ready');
			updateTotalProgress();
		};

		//当文件被移除队列后触发
		uploader.onFileDequeued = function(file) {
			fileCount--;
			fileSize -= file.size;
			if(!fileCount) {
				setState('pedding');
			}
			removeFile(file);
			updateTotalProgress();
		};

		uploader.on('all', function(type) {
			var stats;
			switch(type) {
				case 'uploadFinished': //当所有文件上传结束时触发
					setState('confirm');
					break;
				case 'startUpload': //当开始上传流程时触发
					setState('uploading');
					break;
				case 'stopUpload': //当开始上传流程暂停时触发
					setState('paused');
					break;
			}
		});

		//选择文件校验失败以后触发
		uploader.onError = function(code) {
			alert('Eroor: ' + code);
		};

		//上传按钮
		$upload.on('click', function() {
			if($(this).hasClass('disabled')) {
				return false;
			}
			if(state === 'ready') {
				uploader.upload();
			} else if(state === 'paused') {
				uploader.upload();
			} else if(state === 'uploading') {
				uploader.stop();
			}
		});

		//重新上传
		$info.on('click', '.retry', function() {
			uploader.retry();
		});

		//上传按钮样式变化
		$upload.addClass('state-' + state);

		//更新上传进度
		updateTotalProgress();
	});
})(jQuery);
