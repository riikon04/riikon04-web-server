# Riikon04 Web Server

Đây là dự án [Next.js](https://nextjs.org) được khởi tạo bằng [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Cuối cùng, bạn có thể chạy ứng dụng trong chế độ phát triển:

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt của bạn để xem kết quả.

Bạn có thể bắt đầu chỉnh sửa trang bằng cách thay đổi file `app/page.tsx`. Trang sẽ tự động cập nhật khi bạn chỉnh sửa file.

Dự án này sử dụng [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) để tự động tối ưu hóa và tải font [Geist](https://vercel.com/font), một font mới từ Vercel.

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

## Tìm hiểu thêm

Để tìm hiểu thêm về Next.js, hãy xem các tài liệu sau:

- [Tài liệu Next.js](https://nextjs.org/docs) - tìm hiểu về các tính năng và API của Next.js.
- [Học Next.js](https://nextjs.org/learn) - hướng dẫn tương tác về Next.js.

Bạn có thể kiểm tra [repository GitHub của Next.js](https://github.com/vercel/next.js) - đóng góp và phản hồi của bạn luôn được chào đón!

## Triển khai trên Vercel

Cách dễ nhất để triển khai ứng dụng Next.js của bạn là sử dụng [Nền tảng Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) từ các nhà sáng tạo của Next.js.

Xem [tài liệu triển khai Next.js](https://nextjs.org/docs/app/building-your-application/deploying) để biết thêm chi tiết.

## Đóng góp

Chúng tôi luôn chào đón mọi đóng góp cho dự án này. Vui lòng tham khảo các template sẵn có khi tạo issue hoặc pull request.