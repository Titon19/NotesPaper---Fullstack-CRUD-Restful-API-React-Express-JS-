import React, { useEffect, useState } from "react";
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
import axiosInstance from "../../../lib/axios";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../components/Items/Modal";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { Badge } from "@/components/ui/badge";
import { VITE_BACKEND_URL } from "../../../lib/config";

const Index = () => {
  const [notes, setNotes] = useState([]);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/api/notes`);

      setNotes(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (id) => {
    try {
      await axiosInstance.delete(`/api/notes/${id}`);
      getData();
    } catch (error) {
      console.log("Error: ", error.response?.data?.message);
    }
  };

  const formatDate = useFormattedDate;

  return (
    <>
      <MainLayout
        title={"Notes"}
        to={"/notes/create"}
        icon={<PlusCircleIcon />}
        buttonTopText={"Tambah"}
      >
        <Table>
          <TableHeader>
            <tr>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead className="text-wrap">Judul</TableHead>
              <TableHead>Konten</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Gambar</TableHead>
              <TableHead>Tanggal Buat</TableHead>
              <TableHead>Aksi</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {notes.map((note, index) => (
              <tr key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{note.title}</TableCell>
                <TableCell>{note.content}</TableCell>
                <TableCell>
                  <Badge>{note.category.name}</Badge>
                </TableCell>
                <TableCell>
                  <img
                    src={`${VITE_BACKEND_URL}${note.image}`}
                    className="rounded-xl"
                    width={50}
                    height={50}
                    alt="Image"
                  />
                </TableCell>
                <TableCell className="text-nowrap">
                  {formatDate(note.createdAt)}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button>
                    <Link to={`/notes/${note.id}/edit`}>
                      <PencilSquareIcon />
                    </Link>
                  </Button>
                  <Modal
                    icon={<TrashIcon />}
                    itemId={note.id}
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
