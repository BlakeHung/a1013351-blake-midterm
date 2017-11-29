a1013351 
洪維呈
JS 進階前端課程 期中考

學號最末碼是奇數請做這題：存錢桶設計

＿

頁面設計

1. app.get('/')：首頁 (http://jsbin.com/kigidoqato/edit?html,output)
    1. submit 到 /getName，再轉址到 /moeny
2. app.post('/getName')：將主人名字寫到 firebase記錄起來
3. app.get('/money')：UI範例 (http://jsbin.com/keqoromaco/1/edit)
    1. 名字要從 firebase 取出
    2. 存錢 submit post 到 /saveMoney 後，寫入 firebase 資料庫，並 push 存錢記錄在最下面 會有個 ul li list，下方存錢桶的數據會累加
4. app.post('/saveMoney')：存錢到 firebase，再轉址回 /moeny

