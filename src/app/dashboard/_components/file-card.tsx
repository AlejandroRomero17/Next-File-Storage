import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ImageIcon,
  MoreVertical,
  TrashIcon,
  FileTextIcon,
  FileIcon,
  NotepadTextIcon,
  FileBarChart2,
  StarIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

// Componente para manejar las acciones del archivo
export function FileCardActions({ file }: { file: Doc<"files"> }) {
  // Mutación para eliminar el archivo
  const deleteFile = useMutation(api.files.deleteFile);
  const { toast } = useToast(); // Hook para mostrar notificaciones
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Estado para el diálogo de confirmación

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id, // Eliminar el archivo usando su ID
                });
                toast({
                  variant: "default",
                  title: "File deleted",
                  description: "Your file is now gone from the system",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)} // Abrir el diálogo de confirmación
            className="flex gap-1 text-yellow-500 items-center cursor-pointer"
          >
            <StarIcon className="w-5 h-5" />
            <DropdownMenuSeparator/>
            Favorite
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)} // Abrir el diálogo de confirmación
            className="flex gap-1 text-red-500 items-center cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// Componente para mostrar la tarjeta del archivo
export function FileCard({ file }: { file: Doc<"files"> }) {
  const [fileUrl, setFileUrl] = useState<string | null>(null); // Estado para la URL del archivo
  const url = useQuery(api.files.getFileUrl, { fileId: file.fileId }); // Consulta para obtener la URL del archivo

  useEffect(() => {
    if (url) {
      setFileUrl(url); // Actualizar el estado de la URL del archivo
    }
  }, [url]);

  // Iconos para diferentes tipos de archivos
  const typeIcons: Record<string, ReactNode> = {
    image: <ImageIcon />,
    pdf: <FileIcon />,
    csv: <FileBarChart2 />,
    doc: <FileTextIcon />,
    txt: <NotepadTextIcon />,
  };

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 items-center">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions file={file} /> {/* Acciones de la tarjeta */}
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex items-center justify-center overflow-hidden">
        {file.type === "image" && fileUrl ? (
          <Image
            alt={file.name}
            src={fileUrl} // Mostrar la imagen usando la URL
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {typeIcons[file.type]}
            {/* <div>{file.name}</div> */}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => {
            if (fileUrl) {
              window.open(fileUrl, "_blank"); // Abrir el archivo en una nueva pestaña
            }
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
