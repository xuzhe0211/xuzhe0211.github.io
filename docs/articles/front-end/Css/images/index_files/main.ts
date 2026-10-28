import { createApp } from "/@fs/Users/zyb/Desktop/zuoyebang/speakmaster/node_modules/.vite/deps/vue.js?v=8f14fb11";
import App from "/role/App.vue?t=1692071897636";
import "/@fs/Users/zyb/Desktop/zuoyebang/speakmaster/src/utils/monitor.ts";
import "/@fs/Users/zyb/Desktop/zuoyebang/speakmaster/node_modules/.vite/deps/vant_es_toast_style.js?v=8f14fb11";
import "/@fs/Users/zyb/Desktop/zuoyebang/speakmaster/src/assets/font.scss?t=1692013821032";
import { initSentry } from "/@fs/Users/zyb/Desktop/zuoyebang/speakmaster/src/utils/sentry.ts";
import { i18n } from "/@fs/Users/zyb/Desktop/zuoyebang/speakmaster/src/utils/i18n.ts";
const app = createApp(App);
app.use(i18n);
initSentry(app);
app.mount("#app");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96eWIvRGVza3RvcC96dW95ZWJhbmcvc3BlYWttYXN0ZXIvc3JjL3BhZ2VzL3JvbGUvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBcHAgfSBmcm9tICd2dWUnO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC52dWUnO1xuaW1wb3J0ICdAL3V0aWxzL21vbml0b3InO1xuaW1wb3J0ICd2YW50L2VzL3RvYXN0L3N0eWxlJztcbmltcG9ydCAnQC9hc3NldHMvZm9udC5zY3NzJztcblxuaW1wb3J0IHsgaW5pdFNlbnRyeSB9IGZyb20gJ0AvdXRpbHMvc2VudHJ5JztcblxuaW1wb3J0IHsgaTE4biB9IGZyb20gJ0AvdXRpbHMvaTE4bic7XG5jb25zdCBhcHAgPSBjcmVhdGVBcHAoQXBwKTtcbmFwcC51c2UoaTE4bik7XG5pbml0U2VudHJ5KGFwcCk7XG5cbmFwcC5tb3VudCgnI2FwcCcpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLGlCQUFpQjtBQUMxQixPQUFPLFNBQVM7QUFDaEIsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBRVAsU0FBUyxrQkFBa0I7QUFFM0IsU0FBUyxZQUFZO0FBQ3JCLE1BQU0sTUFBTSxVQUFVLEdBQUc7QUFDekIsSUFBSSxJQUFJLElBQUk7QUFDWixXQUFXLEdBQUc7QUFFZCxJQUFJLE1BQU0sTUFBTTsiLCJuYW1lcyI6W119