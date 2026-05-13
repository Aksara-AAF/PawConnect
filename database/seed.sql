INSERT INTO users (name, email, password_hash, phone, is_verified_shelter) VALUES
('Akbar Rahman', 'akbar@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '081234567890', false),
('Daffa Pratama', 'daffa@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '081234567891', false),
('Nabil Azhari', 'nabil@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '081234567892', false),
('Jakarta Animal Shelter', 'shelter@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '02112345678', true);

INSERT INTO pets (uploader_id, name, species, gender, age, location, description, health_notes, status) VALUES
(1, 'Milo', 'Kucing', 'Jantan', '2 tahun', 'Jakarta Selatan', 'Kucing oranye yang sangat ramah dan suka bermain. Cocok untuk keluarga dengan anak-anak.', 'Sudah vaksin lengkap, steril', 'Tersedia'),
(1, 'Luna', 'Kucing', 'Betina', '1 tahun', 'Jakarta Barat', 'Kucing berbulu putih bersih, pendiam tapi penyayang.', 'Vaksin rabies sudah, belum steril', 'Tersedia'),
(2, 'Buddy', 'Anjing', 'Jantan', '3 tahun', 'Depok', 'Golden Retriever yang sangat aktif dan loyal. Butuh halaman luas.', 'Sehat, vaksin lengkap, sudah steril', 'Tersedia'),
(4, 'Kopi', 'Anjing', 'Jantan', '6 bulan', 'Jakarta Timur', 'Anak anjing campuran yang diselamatkan dari jalanan. Sangat ceria.', 'Dalam proses vaksinasi', 'Diproses'),
(4, 'Cici', 'Kucing', 'Betina', '4 tahun', 'Tangerang', 'Kucing calico yang tenang dan cocok untuk apartemen.', 'Sehat, sudah steril', 'Tersedia'),
(3, 'Rocky', 'Anjing', 'Jantan', '2 tahun', 'Bekasi', 'Anjing penjaga yang jinak dan setia. Sudah terlatih dasar.', 'Vaksin lengkap', 'Diadopsi');

INSERT INTO adoption_requests (pet_id, adopter_id, status, application_reason) VALUES
(3, 1, 'Menunggu', 'Saya punya halaman luas di rumah dan pengalaman memelihara anjing sebelumnya. Buddy akan sangat cocok dengan keluarga kami.'),
(4, 2, 'Diterima', 'Saya tinggal di rumah dengan taman kecil dan sudah siap merawat anak anjing. Akan membawa Kopi ke dokter hewan secara rutin.'),
(6, 2, 'Diterima', 'Saya mencari anjing penjaga untuk menemani di rumah. Rocky terlihat sangat cocok.');

INSERT INTO donations (donor_id, amount, message, payment_status) VALUES
(1, 150000.00, 'Semoga bisa membantu operasional shelter. Terima kasih atas kerja kerasnya!', 'Success'),
(2, 75000.00, 'Untuk makanan hewan-hewan di shelter.', 'Success'),
(3, 200000.00, 'Donasi bulanan untuk Jakarta Animal Shelter.', 'Pending');
