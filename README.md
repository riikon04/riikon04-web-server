# Riikon04 Web Server

API server cho website Riikon04, được xây dựng bằng Express.js và cung cấp thông tin về thành viên Discord và dự án của nhóm.

## Bắt đầu

Đầu tiên, bạn clone repository này về máy tính của bạn:

```bash
git clone https://github.com/riikon04/riikon04-web-server.git
```

Sau đó, di chuyển vào thư mục dự án và cài đặt các phụ thuộc:

```bash
cd riikon04-web-server
npm install
```

Tạo file .env trong thư mục gốc với các biến môi trường sau:

```
DISCORD_TOKEN=your_discord_bot_token_here
GUILD_ID=your_discord_guild_id_here
PORT=3000
```

Cuối cùng, bạn có thể chạy ứng dụng trong chế độ phát triển:

```bash
node src/index.js
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt của bạn để xem kết quả.

## API Endpoints

Server cung cấp các API sau:

### Discord APIs

- **GET /api/discord/users** - Hiển thị danh sách người dùng Discord (tối đa 20 người, có thể thay đổi)
  - Query params:
    - `roleId`: Lọc người dùng theo ID vai trò
    - `limit`: Số lượng người dùng tối đa trả về (mặc định: 20)

- **GET /api/discord/server** - Hiển thị thông tin của Discord server

### Project APIs

- **GET /api/projects** - Hiển thị danh sách các dự án của nhóm
  - Query params:
    - `id`: Lấy thông tin chi tiết của một dự án cụ thể

## Công nghệ sử dụng

- **Express.js**: Framework web cho Node.js
- **Discord.js**: Thư viện để tương tác với Discord API
- **Cors**: Middleware để hỗ trợ Cross-Origin Resource Sharing
- **Dotenv**: Để quản lý biến môi trường

## Triển khai

### Triển khai lên Koyeb

1. Đăng ký tài khoản tại [Koyeb](https://koyeb.com/)
2. Tạo file `Dockerfile` trong thư mục gốc:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

3. Đẩy code lên GitHub repository
4. Trong Koyeb, tạo app mới từ GitHub repository
5. Cấu hình các biến môi trường (DISCORD_TOKEN, GUILD_ID)
6. Triển khai ứng dụng

## Đóng góp

Chúng tôi luôn chào đón mọi đóng góp cho dự án này. Vui lòng tham khảo các template sẵn có khi tạo issue hoặc pull request.

## Giấy phép

Dự án này được phân phối theo Giấy phép Apache 2.0. Xem file LICENSE để biết thêm chi tiết.