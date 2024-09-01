import React, { createContext, useState, useContext } from "react";

const BansosDataContext = createContext();

export const useBansosData = () => useContext(BansosDataContext);

export const BansosDataProvider = ({ children }) => {
  const [bansosData, setBansosData] = useState({
    nama: "",
    nik: "",
    nomorKK: "",
    fotoKTP: null,
    fotoKK: null,
    umur: "",
    jenisKelamin: "",
    provinsi: "",
    kabKota: "",
    kecamatan: "",
    kelurahanDesa: "",
    alamat: "",
    rt: "",
    rw: "",
    penghasilanSebelumPandemi: "",
    penghasilanSetelahPandemi: "",
    alasanMembutuhkanBantuan: "",
    pernyataanKebenaran: false,
  });

  const updateBansosData = (field, value) => {
    setBansosData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateData = () => {
    // Implementasi validasi data sesuai dengan ketentuan
    const {
      nama,
      nik,
      nomorKK,
      fotoKTP,
      fotoKK,
      umur,
      jenisKelamin,
      provinsi,
      kabKota,
      kecamatan,
      kelurahanDesa,
      alamat,
      rt,
      rw,
      penghasilanSebelumPandemi,
      penghasilanSetelahPandemi,
      alasanMembutuhkanBantuan,
      pernyataanKebenaran,
    } = bansosData;

    if (
      !nama ||
      !nik ||
      !nomorKK ||
      !fotoKTP ||
      !fotoKK ||
      !umur ||
      !jenisKelamin ||
      !provinsi ||
      !kabKota ||
      !kecamatan ||
      !kelurahanDesa ||
      !alamat ||
      !rt ||
      !rw ||
      !penghasilanSebelumPandemi ||
      !penghasilanSetelahPandemi ||
      !alasanMembutuhkanBantuan ||
      !pernyataanKebenaran
    ) {
      return false;
    }

    if (
      typeof nik !== "number" ||
      typeof nomorKK !== "number" ||
      typeof umur !== "number" ||
      umur < 25 ||
      typeof penghasilanSebelumPandemi !== "number" ||
      typeof penghasilanSetelahPandemi !== "number"
    ) {
      return false;
    }

    if (alamat.length > 255) {
      return false;
    }

    if (fotoKTP.size > 2 * 1024 * 1024 || fotoKK.size > 2 * 1024 * 1024) {
      return false;
    }

    // Tambahkan validasi lain sesuai kebutuhan

    return true;
  };

  const submitData = () => {
    if (validateData()) {
      // Implementasi pengiriman data ke server
      console.log("Data valid dan siap dikirim:", bansosData);
      return true;
    } else {
      console.log("Data tidak valid");
      return false;
    }
  };

  return (
    <BansosDataContext.Provider
      value={{ bansosData, updateBansosData, submitData }}>
      {children}
    </BansosDataContext.Provider>
  );
};
