import { useEffect, useState } from "react";
import { useBansosData } from "./DataProvider";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { bansosData, updateBansosData } = useBansosData();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [provinsi, setProvinsi] = useState([]);
  const [kabKota, setKabKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahanDesa, setKelurahanDesa] = useState([]);

  const [selectedLocations, setSelectedLocations] = useState({
    provinsi: "",
    kabKota: "",
    kecamatan: "",
  });

  const [imagePreview, setImagePreview] = useState({
    ktp: null,
    kk: null,
  });

  const getProvinsi = async () => {
    const response = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    const data = await response.json();
    setProvinsi(data);
  };

  const getKabKota = async () => {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedLocations.provinsi}.json`
    );
    const data = await response.json();
    setKabKota(data);
  };

  const getKecamatan = async () => {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedLocations.kabKota}.json`
    );
    const data = await response.json();
    setKecamatan(data);
  };

  const getKelurahanDesa = async () => {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedLocations.kecamatan}.json`
    );
    const data = await response.json();
    setKelurahanDesa(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      updateBansosData(name, files[0]);
      setImagePreview((prev) => ({
        ...prev,
        [name === "fotoKTP" ? "ktp" : "kk"]: URL.createObjectURL(files[0]),
      }));
    } else if (type === "select") {
      updateBansosData(name, value);
    } else if (type === "checkbox") {
      updateBansosData(name, checked);
    } else {
      updateBansosData(name, value);
    }
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSelectedLocations((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      navigate("/preview");
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    getProvinsi();
  }, []);

  useEffect(() => {
    if (selectedLocations.provinsi) {
      getKabKota();
    }
  }, [selectedLocations.provinsi]);

  useEffect(() => {
    if (selectedLocations.kabKota) {
      getKecamatan();
    }
  }, [selectedLocations.kabKota]);

  useEffect(() => {
    if (selectedLocations.kecamatan) {
      getKelurahanDesa();
    }
  }, [selectedLocations.kecamatan]);

  useEffect(() => {
    updateBansosData("provinsi", selectedLocations.provinsi);
    updateBansosData("kabKota", selectedLocations.kabKota);
    updateBansosData("kecamatan", selectedLocations.kecamatan);
  }, [selectedLocations]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Nama"
        id="nama"
        name="nama"
        value={bansosData.nama}
        onChange={handleChange}
        required
      />

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="NIK"
          id="nik"
          name="nik"
          value={bansosData.nik}
          onChange={handleChange}
          type="number"
          required
        />

        <InputField
          label="Nomor Kartu Keluarga"
          id="nomorKK"
          name="nomorKK"
          value={bansosData.nomorKK}
          onChange={handleChange}
          type="number"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fotoKTP"
            className="block text-sm font-medium text-gray-700"
          >
            Foto KTP
          </label>
          <div className="w-full h-40 rounded-lg border-2 border-dashed relative mt-2">
            <input
              type="file"
              id="fotoKTP"
              name="fotoKTP"
              onChange={handleChange}
              accept="image/jpeg,image/png,image/bmp"
              required
              className="mt-1 block w-full h-full absolute opacity-0"
            />
            {imagePreview.ktp ? (
              <img
                src={imagePreview.ktp}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Upload Foto KTP</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="fotoKK"
            className="block text-sm font-medium text-gray-700"
          >
            Foto Kartu Keluarga
          </label>
          <div className="w-full h-40 rounded-lg border-2 border-dashed relative mt-2">
            <input
              type="file"
              id="fotoKK"
              name="fotoKK"
              onChange={handleChange}
              accept="image/jpeg,image/png,image/bmp"
              required
              className="mt-1 block w-full h-full absolute opacity-0"
            />
            {imagePreview.kk ? (
              <img
                src={imagePreview.kk}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Upload Foto Kartu Keluarga</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Umur"
          id="umur"
          name="umur"
          value={bansosData.umur}
          onChange={handleChange}
          type="number"
          min="25"
          required
        />

        <div>
          <label
            htmlFor="jenisKelamin"
            className="block text-sm font-medium text-gray-700"
          >
            Jenis Kelamin
          </label>
          <select
            id="jenisKelamin"
            name="jenisKelamin"
            value={bansosData.jenisKelamin}
            onChange={handleChange}
            required
            className="border px-2 py-1.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="provinsi"
            className="block text-sm font-medium text-gray-700"
          >
            Provinsi
          </label>
          <select
            id="provinsi"
            name="provinsi"
            value={bansosData.provinsi}
            onChange={handleSelect}
            required
            className="border px-2 py-1.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Pilih Provinsi</option>
            {provinsi.map((item) => (
              <option key={item.name} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="kabKota"
            className="block text-sm font-medium text-gray-700"
          >
            Kabupaten/Kota
          </label>
          <select
            id="kabKota"
            name="kabKota"
            value={bansosData.kabKota}
            onChange={handleSelect}
            required
            className="border px-2 py-1.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {provinsi.length ? (
              <>
                <option value="">Pilih Kabupaten/Kota</option>
                {kabKota.map((item) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">--Pilih Provinsi terlebih dahulu--</option>
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="kecamatan"
            className="block text-sm font-medium text-gray-700"
          >
            Kecamatan
          </label>
          <select
            id="kecamatan"
            name="kecamatan"
            value={bansosData.kecamatan}
            onChange={handleSelect}
            required
            className="border px-2 py-1.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {kabKota.length ? (
              <>
                <option value="">Pilih Kecamatan</option>
                {kecamatan.map((item) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">--Pilih Kabupaten/Kota terlebih dahulu--</option>
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="kelurahanDesa"
            className="block text-sm font-medium text-gray-700"
          >
            Kelurahan/Desa
          </label>
          <select
            id="kelurahanDesa"
            name="kelurahanDesa"
            value={bansosData.kelurahanDesa}
            onChange={handleChange}
            required
            className="border px-2 py-1.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {kecamatan.length ? (
              <>
                <option value="">Pilih Kelurahan/Desa</option>
                {kelurahanDesa.map((item) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">--Pilih Kecamatan terlebih dahulu--</option>
            )}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="alamat"
          className="block text-sm font-medium text-gray-700"
        >
          Alamat
        </label>
        <textarea
          id="alamat"
          name="alamat"
          value={bansosData.alamat}
          onChange={handleChange}
          required
          rows="4"
          maxLength="255"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border"
        ></textarea>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="RT"
          id="rt"
          name="rt"
          value={bansosData.rt}
          onChange={handleChange}
          required
        />

        <InputField
          label="RW"
          id="rw"
          name="rw"
          value={bansosData.rw}
          onChange={handleChange}
          required
        />

        <InputField
          label="Penghasilan Sebelum Pandemi"
          id="penghasilanSebelumPandemi"
          name="penghasilanSebelumPandemi"
          value={bansosData.penghasilanSebelumPandemi}
          onChange={handleChange}
          type="number"
          required
        />

        <InputField
          label="Penghasilan Setelah Pandemi"
          id="penghasilanSetelahPandemi"
          name="penghasilanSetelahPandemi"
          value={bansosData.penghasilanSetelahPandemi}
          onChange={handleChange}
          type="number"
          required
        />
      </div>

      <div>
        <label
          htmlFor="alasanMembutuhkanBantuan"
          className="block text-sm font-medium text-gray-700"
        >
          Alasan Membutuhkan Bantuan
        </label>
        <select
          id="alasanMembutuhkanBantuan"
          name="alasanMembutuhkanBantuan"
          value={bansosData.alasanMembutuhkanBantuan}
          onChange={handleChange}
          required
          className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Pilih Alasan</option>
          <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
          <option value="Kepala keluarga">Kepala keluarga</option>
          <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      {bansosData.alasanMembutuhkanBantuan === "Lainnya" && (
        <InputField
          label="Alasan Lainnya"
          id="alasanLainnya"
          name="alasanLainnya"
          value={bansosData.alasanLainnya || ""}
          onChange={handleChange}
          required
        />
      )}

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="pernyataanKebenaran"
            checked={bansosData.pernyataanKebenaran}
            onChange={handleChange}
            required
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-600">
            Saya menyatakan bahwa data yang diisikan adalah benar dan siap
            mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data
            tersebut.
          </span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <p>
              <span className="loader"></span> Loading...
            </p>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
