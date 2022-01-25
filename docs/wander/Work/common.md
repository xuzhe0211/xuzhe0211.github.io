---
title: 使用的一些方法
---

```
// 加载图片
export const loadImg = (src) => {
    return new Promise((resolve) => {
        const img = new Image();
        // img.crossOrigin = 'Anonymous';
        img.src = src;
        img.setAttribute('crossOrigin', 'Anonymous');
        img.onload = () => {
            resolve(img);
        };
    });
};
export const getOffsetPoint = (obj) => {
    // 获取某元素以浏览器左上角为原点的坐标
    let y = obj.offsetTop; // 获取该元素对应父容器的上边距
    let x = obj.offsetLeft; // 对应父容器的上边距
    // 判断是否有父容器，如果存在则累加其边距
    while (obj === obj.offsetParent) {
        // 等效 obj = obj.offsetParent;while (obj != undefined)
        y += obj.offsetTop; // 叠加父容器的上边距
        x += obj.offsetLeft; // 叠加父容器的左边距
    }
    return {
        x,
        y
    };
};
export const generateLinePoint = (event, config, containerInfo) => {
    let {width, height, x, y} = containerInfo;
    x = event.clientX - x;
    y = event.clientY - y;
    // 缩放位移坐标变化规律
    // (transformOrigin - downX) / scale * (scale-1) + downX - translateX = pointX
    const pointX = ((width / 2 - x) / config.scale) * (config.scale - 1) + x - config.translateX;
    const pointY = ((height / 2 - y) / config.scale) * (config.scale - 1) + y - config.translateY;
    return {
        pointX,
        pointY
    };
};
// 绘制
export const drawPoint = (ctx, x, y, color, noPoint, diameter) => {
    return new Promise((resolve) => {
        if (Object.prototype.toString.call(x) !== '[object Number]') return false;
        // 设置绘制颜色
        ctx.fillStyle = color ? color : '#fb0606';
        // 绘制成矩形
        // ctx.arc(point.x, point.y,5, 0, Math.PI * 5);
        if (diameter) {
            ctx.fillRect(x - diameter / 2, y - diameter / 2, diameter, diameter);
        } else {
            ctx.fillRect(x - 1, y - 1, 1, 1);
        }
        // 设置字体样式
        ctx.font = '12px bold 宋体';
        // 绘制文字
        noPoint ? '' : ctx.fillText(`${x.toFixed(2) / 1}, ${y.toFixed(2) / 1}`, x, y);
        resolve();
    });
};
export const drawLine = (ctx, prevXY, nextXY, color) => {
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = color || 'red';
    ctx.moveTo(prevXY[0], prevXY[1]);
    ctx.lineTo(nextXY[0], nextXY[1]);
    ctx.stroke();
};
export const drawClose = (ctx, x, y) => {
    ctx.fillStyle = 'red';
    ctx.font = '12px bold 宋体';
    // 绘制文字
    ctx.fillText('x', x, y);
};

/**
 *
 * lens:12焦距
 * sensor_size_scale 1.8 传感器尺寸
 * k1 畸变系数
 *{
    Eigen::Matrix3d rotationMatrix = quaternion_.toRotationMatrix();
    Eigen::Vector3d p_camera = rotationMatrix.transpose() * (Point3d - t_);
    double xc1 = p_camera(0, 0) / p_camera(2, 0);
    double yc1 = p_camera(1, 0) / p_camera(2, 0);
    double r_2 = xc1 * xc1 + yc1 * yc1;
    fx_ = 2203.0 * lens * sensor_size_scale / 16.0;
    fy_ = 2203.0 * lens * sensor_size_scale / 16.0;
    cx_ = 960.0;
    cy_ = 540.0;
    double u1 = fx_ * (1 + k1 * r_2) * xc1 + cx_;
    double v1 = fy_ * (1 + k1 * r_2) * yc1 + cy_;
    return Eigen::Vector2d(u1, v1);
    }
 */
export const formatUn3dTo2d = ([x, y, z], yamlData, row) => {
    // 联合标定 3d to2d
    let matrix3 = new THREE.Matrix3();
    const qw = yamlData.towards[0];
    const qx = yamlData.towards[1];
    const qy = yamlData.towards[2];
    const qz = yamlData.towards[3];
    const tx = yamlData.xyz[0];
    const ty = yamlData.xyz[1];
    const tz = yamlData.xyz[2];
    const fx = (2203.0 * row.lens * row.sensorSizeScale) / 16.0;
    const fy = (2203.0 * row.lens * row.sensorSizeScale) / 16.0;
    const cx = 960.0;
    const cy = 540.0;
    const k1 = 0; // 目前c++存在的问题 先用0 后续row.distortion
    let transPose = matrix3
        .set(
            1 - 2 * (qy * qy) - 2 * (qz * qz),
            2 * (qx * qy - qw * qz),
            2 * (qx * qz + qw * qy),
            2 * (qx * qy + qw * qz),
            1 - 2 * (qx * qx) - 2 * (qz * qz),
            2 * (qy * qz - qw * qx),
            2 * (qx * qz - qw * qy),
            2 * (qy * qz + qw * qx),
            1 - 2 * (qx * qx) - 2 * (qy * qy)
        )
        .transpose();
    let point3d = new THREE.Vector3(x, y, z).sub(new THREE.Vector3(tx, ty, tz));
    let v = point3d.applyMatrix3(transPose);
    const xc1 = v.getComponent(0) / v.getComponent(2);
    const yc1 = v.getComponent(1) / v.getComponent(2);
    // eslint-disable-next-line camelcase
    const r_2 = xc1 * xc1 + yc1 * yc1;
    // eslint-disable-next-line camelcase
    return v.getComponent(2) > 0
        ? new THREE.Vector2(fx * (1 + k1 * r_2) * xc1 + cx, fy * (1 + k1 * r_2) * yc1 + cy)
        : {x: undefined, y: undefined};
};
export const from3dTo2d = ([x, y, z], yamlData, insertResult) => {
    // 外参标定 3d to2d
    const qw = yamlData.towards[0];
    const qx = yamlData.towards[1];
    const qy = yamlData.towards[2];
    const qz = yamlData.towards[3];
    const tx = yamlData.xyz[0];
    const ty = yamlData.xyz[1];
    const tz = yamlData.xyz[2];
    const fx = insertResult.internalParam[0];
    const fy = insertResult.internalParam[1];
    const cx = insertResult.internalParam[2];
    const cy = insertResult.internalParam[3];
    let matrix3 = new THREE.Matrix3();
    let transPose = matrix3
        .set(
            1 - 2 * (qy * qy) - 2 * (qz * qz),
            2 * (qx * qy - qw * qz),
            2 * (qx * qz + qw * qy),
            2 * (qx * qy + qw * qz),
            1 - 2 * (qx * qx) - 2 * (qz * qz),
            2 * (qy * qz - qw * qx),
            2 * (qx * qz - qw * qy),
            2 * (qy * qz + qw * qx),
            1 - 2 * (qx * qx) - 2 * (qy * qy)
        )
        .transpose();
    let point3d = new THREE.Vector3(x, y, z).sub(new THREE.Vector3(tx, ty, tz));
    let v = point3d.applyMatrix3(transPose);
    return v.getComponent(2) > 0
        ? new THREE.Vector2(
            (fx * v.getComponent(0)) / v.getComponent(2) + cx,
            (fy * v.getComponent(1)) / v.getComponent(2) + cy
        )
        : {x: undefined, y: undefined};
};
export const quaterTransEuler = (x, y, z, w) => {
    const Euler = new THREE.Euler();
    const quaternion = new THREE.Quaternion(x, y, z, w);
    return Euler.setFromQuaternion(quaternion);
};
export const eulerTransQuater = (x, y, z) => {
    const Euler = new THREE.Euler(x, y, z);
    const quaternion = new THREE.Quaternion();
    return quaternion.setFromEuler(Euler);
};
// img转base64
export const imgTransformBase64 = (url) => {
    return new Promise((resolve) => {
        const Img = new Image();
        let dataURL = '';
        Img.src = url;
        Img.setAttribute('crossOrigin', 'Anonymous');
        Img.onload = () => {
            const canvas = document.createElement('canvas');
            const width = Img.width;
            const height = Img.height;
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
            dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };
    });
};
// file文件/blob转base64图片
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = () => {
            imgResult = reader.result;
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.onloadend = () => {
            resolve(imgResult);
        };
    });
};
// base64转blob
export const convertBase64UrlToBlob = (urlData) => {
    // 去掉url的头，并转换为byte
    const split = urlData.split(',');
    const bytes = window.atob(split[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: split[0]});
};
// base64转file文件
export const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
};

// 欧几里得距离
export const getDistance = (a, b) => {
    const xDiff = (a.x - b.x) ** 2;
    const yDiff = (a.y - b.y) ** 2;
    return Math.sqrt(xDiff + yDiff);
};
// 查找最短距离
export const findRecentPoint = (pointList, targetPoint) => {
    let sd = getDistance(pointList[0], targetPoint);
    let sdItem = pointList[0];
    let sdIndex = 0;
    for (const [index, item] of pointList.entries()) {
        const nowd = getDistance(item, targetPoint);
        if (nowd < sd && !item.link) {
            sd = nowd;
            sdItem = item;
            sdIndex = index;
        }
    }
    return {
        item: sdItem,
        index: sdIndex
    };
};

```