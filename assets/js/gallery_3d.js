// 3D Gallery Module
const Gallery3D = (function () {

    // --- 配置参数 ---
    const config = {
        radius: 320,         // 相册半径 (PC端)
        radiusMobile: 200,   // 相册半径 (移动端)
        minRadius: 150,      // 【新增】最小缩放半径 (此值会在初始化时被动态计算覆盖)
        maxRadius: 600,      // 【新增】最大缩放半径
        autoRotate: true,
        rotateSpeed: -60,    // 單位: s/圈
        imgWidth: 140,
        imgHeight: 210,
        photoRows: 2,        // 【可配置】照片墙的排数
    };

    // --- 状态变量 ---
    let state = {
        radius: window.innerWidth < 768 ? config.radiusMobile : config.radius,
        tX: 0,
        tY: 10,
        desX: 0,
        desY: 0,
        active: true, // 用于判断当前模块是否应该响应事件
    };

    // --- DOM 元素 ---
    let odrag, ospin, aEle = [];

    function init() {
        odrag = document.getElementById('drag-container');
        ospin = document.getElementById('spin-container');

        // 动态加载图片
        loadImages();

        // 【新增】动态计算最小半径，以防止图片重叠
        const elementsPerRow = Math.ceil(aEle.length / config.photoRows);
        // 公式：(周长 / 图片数) >= (图片宽度 + 间距)
        // 推导：r >= ((图片宽度 + 间距) * 图片数) / (2 * PI)
        const padding = 20; // 为图片之间设置20px的最小间距
        config.minRadius = Math.ceil(((config.imgWidth + padding) * elementsPerRow) / (2 * Math.PI));

        ospin.style.width = config.imgWidth + "px";
        ospin.style.height = config.imgHeight + "px";

        const ground = document.getElementById('ground');
        ground.style.width = state.radius * 3 + "px";
        ground.style.height = state.radius * 3 + "px";

        setTimeout(applyInitialTransform, 100);

        if (config.autoRotate) {
            const animationName = (config.rotateSpeed > 0 ? 'spin' : 'spinRevert');
            ospin.style.animation = `${animationName} ${Math.abs(config.rotateSpeed)}s infinite linear`;
        }
        
        setupEventListeners();
    }

    function loadImages() {
        const imagePaths = [ // 数据驱动：在这里添加图片路径
            "assets/data/gallery_images/微信图片_20250331175956.jpg", "assets/data/gallery_images/2.jpg", 
            "assets/data/gallery_images/3.jpg", "assets/data/gallery_images/4.jpg", 
            "assets/data/gallery_images/5.jpg", "assets/data/gallery_images/6.jpg",
            "assets/data/gallery_images/7.jpg", "assets/data/gallery_images/8.jpg",
            "assets/data/gallery_images/9.jpg", "assets/data/gallery_images/10.jpg",
            "assets/data/gallery_images/11.jpg", "assets/data/gallery_images/12.jpg",
        ];
        
        imagePaths.forEach(path => {
            const img = document.createElement('img');
            img.src = path;
            ospin.appendChild(img);
        });
        aEle = ospin.getElementsByTagName('img');
    }

    function applyInitialTransform(delayTime) {
        const elementsPerRow = Math.ceil(aEle.length / config.photoRows);

        for (let i = 0; i < aEle.length; i++) {
            const row = Math.floor(i / elementsPerRow);
            const indexInRow = i % elementsPerRow;
            
            // 计算 Y 轴偏移，让多排照片垂直排列
            const yOffset = (row - (config.photoRows - 1) / 2) * (config.imgHeight + 40);

            aEle[i].style.transform = `rotateY(${indexInRow * (360 / elementsPerRow)}deg) translateZ(${state.radius}px) translateY(${yOffset}px)`;
            aEle[i].style.transition = "transform 1s";
            aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
        }
    }

    function applyRuntimeTransform(obj) {
        // 【修改】将垂直旋转的阈值从 90° 修改为 45°
        if (state.tY > 45) state.tY = 45;
        if (state.tY < -45) state.tY = -45;
        obj.style.transform = `rotateX(${-state.tY}deg) rotateY(${state.tX}deg)`;
    }

    function playSpin(yes) {
        ospin.style.animationPlayState = (yes ? 'running' : 'paused');
    }

    function updateRadius() {
        for (let i = 0; i < aEle.length; i++) {
            const row = Math.floor(i / Math.ceil(aEle.length / config.photoRows));
            const yOffset = (row - (config.photoRows - 1) / 2) * (config.imgHeight + 40);
            const indexInRow = i % Math.ceil(aEle.length / config.photoRows);
            const elementsPerRow = Math.ceil(aEle.length / config.photoRows);

            // 通过禁用过渡效果来实现实时缩放
            aEle[i].style.transition = 'none';
            aEle[i].style.transform = `rotateY(${indexInRow * (360 / elementsPerRow)}deg) translateZ(${state.radius}px) translateY(${yOffset}px)`;
        }
    }

    function setupEventListeners() {
        let lastTouchDistance = 0;

        // --- 拖拽旋转 ---
        document.onpointerdown = function (e) {
            if (!state.active) return;
            clearInterval(odrag.timer);
            let sX = e.clientX, sY = e.clientY;

            this.onpointermove = function (e) {
                const nX = e.clientX, nY = e.clientY;
                state.desX = nX - sX;
                state.desY = nY - sY;      // 【修改】启用垂直拖动计算
                state.tX += state.desX * 0.1;
                state.tY += state.desY * 0.1;  // 【修改】启用垂直拖动计算
                applyRuntimeTransform(odrag);
                sX = nX;
                sY = nY;
            };

            this.onpointerup = function (e) {
                odrag.timer = setInterval(() => {
                    state.desX *= 0.95;
                    state.desY *= 0.95;    // 【修改】启用垂直拖动惯性
                    state.tX += state.desX * 0.1;
                    state.tY += state.desY * 0.1;  // 【修改】启用垂直拖动惯性
                    applyRuntimeTransform(odrag);
                    playSpin(false);

                    // 【修改】停止条件现在同时检查水平和垂直方向的惯性
                    if (Math.abs(state.desX) < 0.5 && Math.abs(state.desY) < 0.5) {
                        clearInterval(odrag.timer);
                        playSpin(true);
                    }
                }, 17);
                this.onpointermove = this.onpointerup = null;
        };
            return false;
        };

        // --- 滚轮/双指缩放 ---
        document.onmousewheel = function (e) {
            if (!state.active) return;
            const d = e.wheelDelta / 20 || -e.detail;
            let newRadius = state.radius + d;

            // 【新增】应用缩放阈值
            if (newRadius < config.minRadius) newRadius = config.minRadius;
            if (newRadius > config.maxRadius) newRadius = config.maxRadius;

            // 仅当半径实际发生变化时才更新
            if (state.radius !== newRadius) {
                state.radius = newRadius;
                updateRadius();
            }
        };

        document.addEventListener('touchstart', function(e) {
            if (!state.active || e.touches.length < 2) return;
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            lastTouchDistance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
        });

        document.addEventListener('touchmove', function(e) {
            if (!state.active || e.touches.length < 2) return;
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
            const diff = currentDistance - lastTouchDistance;
            
            let newRadius = state.radius + diff * 0.5; // 调整缩放灵敏度

            // 【新增】应用缩放阈值
            if (newRadius < config.minRadius) newRadius = config.minRadius;
            if (newRadius > config.maxRadius) newRadius = config.maxRadius;

            // 仅当半径实际发生变化时才更新
            if (state.radius !== newRadius) {
                state.radius = newRadius;
                updateRadius();
            }
            
            lastTouchDistance = currentDistance;
        });

        // --- 图片点击/双击 ---
        let lastClickTime = 0;
        ospin.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                const now = new Date().getTime();
                if (now - lastClickTime < 300) { // 300ms 内两次点击算双击
                    // 双击事件
                    document.dispatchEvent(new CustomEvent('galleryImageDoubleClick', { detail: { src: e.target.src } }));
                }
                lastClickTime = now;
            }
        });
    }
    
    // --- 暴露公共方法 ---
    return {
        init: init,
        setActive: (isActive) => { state.active = isActive; }
    };
})();
