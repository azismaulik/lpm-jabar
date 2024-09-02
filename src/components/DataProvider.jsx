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

  return (
    <BansosDataContext.Provider value={{ bansosData, updateBansosData }}>
      {children}
    </BansosDataContext.Provider>
  );
};
