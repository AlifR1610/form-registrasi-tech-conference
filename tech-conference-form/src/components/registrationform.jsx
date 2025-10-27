import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './registrationform.css';

// Fungsi validasi password 
const validatePassword = (value) => {
  if (value.length < 8) {
    return "Password harus 8+ karakter, mengandung angka & simbol";
  }
  if (!/\d/.test(value)) {
    return "Password harus 8+ karakter, mengandung angka & simbol";
  }
  // Kita gunakan regex untuk simbol umum.
  if (!/[!@#$%^&*]/.test(value)) {
    return "Password harus 8+ karakter, mengandung angka & simbol";
  }
  return true; // Validasi lolos
};


function RegistrationForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset //  reset untuk mengosongkan form setelah submit
  } = useForm({
    mode: "onChange" // Validasi berjalan saat input berubah
  });

  // State feedback setelah submit 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // Fungsi yang dijalankan saat form submit dan valid
  const onSubmit = (data) => {
    console.log("Data Registrasi:", data);
    setIsSubmitted(true);
    setSubmittedName(data.fullName);
    reset(); // Kosongkan form setelah berhasil submit
  };

  // useEffect untuk menghilangkan pesan sukses setelah 3 detik
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedName("");
      }, 3000); // 3 detik

      // Cleanup function untuk membersihkan timer
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]); // Efek ini hanya berjalan saat isSubmitted berubah

  return (
    <div className="form-container">
      
      {/* Pesan Sukses (Tampil jika isSubmitted true) */}
      {isSubmitted && (
        <div className="success-message">
          Registrasi Berhasil, {submittedName}!
        </div>
      )}

      <h1>Registrasi Tech Conference</h1>
    
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* 1. Nama Lengkap */}
        <div className="form-group">
          <label htmlFor="fullName">Nama Lengkap</label>
          <input
            id="fullName"
            type="text"
            className={errors.fullName ? 'input-error' : ''}
            {...register("fullName", { 
              required: "Nama lengkap wajib diisi" 
            })}
          />
          {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
        </div>

        {/* 2. Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className={errors.username ? 'input-error' : ''}
            {...register("username", {
              required: "Username wajib diisi",
              minLength: { value: 6, message: "Username minimal 6 karakter" },
              maxLength: { value: 20, message: "Username maksimal 20 karakter" }
            })}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        {/* 3. Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={errors.email ? 'input-error' : ''}
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format email tidak valid"
              }
            })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        {/* 4. Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={errors.password ? 'input-error' : ''}
            {...register("password", {
              required: "Password wajib diisi",
              validate: validatePassword // Menggunakan fungsi validasi kustom
            })}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        {/* 5. Umur */}
        <div className="form-group">
          <label htmlFor="age">Umur</label>
          <input
            id="age"
            type="number"
            className={errors.age ? 'input-error' : ''}
            {...register("age", {
              required: "Umur wajib diisi",
              valueAsNumber: true, // Konversi nilai ke angka
              min: { value: 18, message: "Peserta harus berusia antara 18 dan 100 tahun" },
              max: { value: 100, message: "Peserta harus berusia antara 18 dan 100 tahun" }
            })}
          />
          {errors.age && <span className="error-message">{errors.age.message}</span>}
        </div>

        {/* 6. Tipe Tiket */}
        <div className="form-group">
          <label htmlFor="ticketType">Tipe Tiket</label>
          <select
            id="ticketType"
            className={errors.ticketType ? 'input-error' : ''}
            {...register("ticketType", { 
              required: "Anda harus memilih tipe tiket" 
            })}
          >
            <option value="">-- Pilih Tipe Tiket --</option>
            <option value="General Access">General Access</option>
            <option value="VIP">VIP</option>
            <option value="Student">Student</option>
          </select>
          {errors.ticketType && <span className="error-message">{errors.ticketType.message}</span>}
        </div>

        {/* 7. Situs Web Pribadi (Opsional) */}
        <div className="form-group">
          <label htmlFor="websiteUrl">Situs Web Pribadi (Opsional)</label>
          <input
            id="websiteUrl"
            type="text"
            className={errors.websiteUrl ? 'input-error' : ''}
            {...register("websiteUrl", {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Format URL tidak valid"
              }
            })}
          />
          {errors.websiteUrl && <span className="error-message">{errors.websiteUrl.message}</span>}
        </div>

        {/* 8. Syarat & Ketentuan */}
        <div className="form-group-checkbox">
          <input
            id="agreeToTerms"
            type="checkbox"
            {...register("agreeToTerms", { 
              required: "Anda harus menyetujui syarat dan ketentuan" 
            })}
          />
          <label htmlFor="agreeToTerms">Setuju dengan Syarat & Ketentuan</label>
        </div>
        {/* Pesan error untuk checkbox ditampilkan di bawahnya */}
        {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms.message}</span>}

        {/* Tombol Submit */}
        <button type="submit" className="submit-btn">Registrasi</button>
      </form>
    </div>
  );
}

export default RegistrationForm;