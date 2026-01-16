document.addEventListener('DOMContentLoaded', function() {
    //获取页面header元素
    const header=document.getElementById('page-header');
    if(header)
    {
    // 1. 确保header背景始终透明,避免蓝色闪烁
    header.style.backgroundColor='transparent !important';

    // 2. 创建视频元素
    const video=document.createElement('video');
    video.src='/imgs/steinsgate.mp4';
    video.loop=true;
    video.muted=true;
    video.autoplay=true;
    video.playsinline=true;
    video.preload='auto';

    // 3. 设置视频样式，确保始终显示
    video.style.position='absolute';
    video.style.top='0';
    video.style.left='0';
    video.style.width='100%';
    video.style.height='100%';
    video.style.objectFit='cover';
    video.style.opacity='0';
    video.style.transition='opacity 1s ease';
    video.style.zIndex='0';

    // 4. 只在首次加载时执行淡入效果
    let hasPlayed = false;
    video.addEventListener('canplaythrough', function() {
      if (!hasPlayed) {
        hasPlayed = true;
        header.insertBefore(video, header.firstChild);

        // 5. 执行首次加载的淡入效果
        setTimeout(() => {
          video.style.opacity = '1';
        }, 100);
      }
    });

    // 6. 监听视频循环事件，确保循环时不执行淡入效果
    video.addEventListener('ended', function() {
      // 视频循环时保持完全显示
      video.style.opacity = '1';
    });
    }
    })