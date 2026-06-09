---
title: Stream
---
```js
import { getToken } from "@/utils/token";
import { isH5 } from "@/utils/common";
import Taro from "@tarojs/taro";

function simulateStreamOutput(fullText, onData, done, interval = 500) {
    const parts = fullText.split("\n").filter(Boolean);
    let index = 0;
    function next() {
        if (index < parts.length) {
            const line = parts[index++];
            onData?.(line + "\n\n");
            setTimeout(next, interval);
        } else {
            done();
        }
    }

    next(); // 启动模拟流输出
}

export const getFetch = async ({
    url,
    method,
    data,
    onData,
}): Promise<void> => {
    const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
    };
    return new Promise<void>((resolve, reject) => {
        if (isH5) {
            fetch(url, {
                method: method,
                headers,
                body: JSON.stringify(data),
            })
                .then((response) => {
                    const reader = response.body!.getReader();
                    let decoder = new TextDecoder("utf-8", { fatal: true });
                    function read() {
                        reader
                            .read()
                            .then(({ done, value }) => {
                                if (done) {
                                    resolve(done as any);
                                    return;
                                }
                                let text = decoder.decode(value, {
                                    stream: true,
                                });
                                if (onData) {
                                    console.log("text", text);
                                    onData(text);
                                }
                                read();
                            })
                            .catch(reject);
                    }
                    read();
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            Taro.request({
                url,
                method: method,
                data: data,
                header: headers,
                success: (response) => {
                    const fullText = response.data;
                    simulateStreamOutput(
                        fullText,
                        (line) => {
                            console.log("模拟输出：", line);
                            // 可以追加显示到页面中，比如 concat 到数组 setState 渲染
                            onData(line);
                        },
                        () => {
                            resolve(fullText as any);
                        }
                    );
                },
                fail: (err) => {
                    reject(err);
                },
            });
        }
    });
};

```