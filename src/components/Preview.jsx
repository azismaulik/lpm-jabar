import React, { useEffect } from "react";
import { useBansosData } from "./DataProvider";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();
  const { bansosData } = useBansosData();

  useEffect(() => {
    if (!bansosData.nama) {
      navigate("/");
    }
  }, [bansosData, navigate]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Preview Data</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nama:</label>
        <p className="mt-1 text-gray-600">{bansosData?.nama}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">NIK:</label>
        <p className="mt-1 text-gray-600">{bansosData?.nik}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Alamat:
        </label>
        <p className="mt-1 text-gray-600">{bansosData?.alamat}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Jenis Kelamin:
        </label>
        <p className="mt-1 text-gray-600">{bansosData?.jenisKelamin}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Kabupaten/Kota:
        </label>
        <p className="mt-1 text-gray-600">{bansosData?.kabKota}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Kecamatan:
        </label>
        <p className="mt-1 text-gray-600">{bansosData?.kecamatan}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Kelurahan/Desa:
        </label>
        <p className="mt-1 text-gray-600">{bansosData?.kelurahanDesa}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nomor KK:
        </label>
        <p className="mt-1 text-gray-600">{bansosData?.nomorKK}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Penghasilan Sebelum Pandemi:
        </label>
        <p className="mt-1 text-gray-600">
          {bansosData?.penghasilanSebelumPandemi}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Penghasilan Setelah Pandemi:
        </label>
        <p className="mt-1 text-gray-600">
          {bansosData?.penghasilanSetelahPandemi}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Alasan Membutuhkan Bantuan:
        </label>
        <p className="mt-1 text-gray-600">
          {bansosData?.alasanMembutuhkanBantuan}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Foto KK:
        </label>
        {bansosData?.fotoKK && (
          <img
            src={URL.createObjectURL(bansosData?.fotoKK)}
            alt="Foto KK"
            className="mt-2 w-full h-auto max-w-xs object-cover rounded"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Foto KTP:
        </label>
        {bansosData?.fotoKTP && (
          <img
            src={URL.createObjectURL(bansosData?.fotoKTP)}
            alt="Foto KTP"
            className="mt-2 w-full h-auto max-w-xs object-cover rounded"
          />
        )}
      </div>
    </div>
  );
};

export default Preview;
