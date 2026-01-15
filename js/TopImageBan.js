document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取关键元素（Butterfly 主题默认选择器）
    const downButton = document.querySelector('.fas fa-angle-down scroll-down-effects'); // 向下按钮
    const webBg = document.getElementById('page-header'); // 顶部图容器
    let isForbidWheel = true; // 滚轮禁止标记（初始为 true：禁止滚轮）

    // 2. 禁止滚轮滚动的核心函数
    function forbidMouseWheel(e) {
        // 仅在「禁止标记为 true」且「页面在顶部」时，阻止滚轮默认行为
        if (isForbidWheel && window.scrollY <= 0) {
            e.preventDefault(); // 阻止默认滚轮滚动
        }
    }

    // 3. 添加滚轮事件监听（passive: false 确保 preventDefault 生效）
    window.addEventListener('wheel', forbidMouseWheel, { passive: false });

    // 4. 点击向下按钮：解除滚轮禁止 + 平滑滚动到下方（替代僵硬的滚轮）
    if (downButton) {
        downButton.addEventListener('click', function() {
            // ① 解除滚轮禁止
            isForbidWheel = false;

            // ② 平滑滚动到顶部图下方（Butterfly 主题默认顶部图高度适配）
            const headerHeight = webBg ? webBg.offsetHeight : 600; // 获取顶部图高度
            window.scrollTo({
                top: headerHeight,
                behavior: 'smooth' // 平滑滚动（核心：替代滚轮的僵硬滚动）
            });

            // ③ 可选：滚动结束后，若用户再次回到顶部，重新禁止滚轮
            setTimeout(() => {
                window.addEventListener('scroll', function() {
                    if (window.scrollY <= 0) {
                        isForbidWheel = true;
                    } else {
                        isForbidWheel = false;
                    }
                });
            }, 1000);
        });
    }

    // 5. 额外保障：用户手动滚动离开顶部后，自动解除滚轮禁止
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            isForbidWheel = false;
        } else {
            isForbidWheel = true; // 回到顶部后，重新禁止滚轮
        }
    });
});