import MainLayout from "../../layouts/MainLayout";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../components/Items/Modal";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import useGetCategories from "@/hooks/useGetCategories";
const Index = () => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { categories, getData } = useGetCategories(
    `${VITE_BACKEND_URL}/api/categories/`
  );

  const handleSubmit = async (id) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/categories/${id}`);
      getData();
    } catch (error) {
      console.log("Error: ", error.response?.data?.message);
    }
  };

  const formatDate = useFormattedDate;

  return (
    <>
      <MainLayout
        title={"Kategori"}
        to={"/categories/create"}
        icon={<PlusCircleIcon />}
        buttonTopText={"Tambah"}
      >
        <Table>
          <TableHeader>
            <tr>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead className="text-wrap">Nama Kategori</TableHead>
              <TableHead>Tanggal Buat</TableHead>
              <TableHead>Aksi</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <tr key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-nowrap">
                  {formatDate(category.createdAt)}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button>
                    <Link to={`/categorys/${category.id}/edit`}>
                      <PencilSquareIcon />
                    </Link>
                  </Button>
                  <Modal
                    icon={<TrashIcon />}
                    itemId={category.id}
                    title={"Hapus"}
                    description={"Apakah anda yakin ingin menghapus data ini?"}
                    submitText={"Hapus"}
                    handleSubmit={handleSubmit}
                  />
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </MainLayout>
    </>
  );
};

export default Index;
