import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BarLoader, RingLoader } from "react-spinners";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((doc) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note..",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };
  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note..",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4 flex-col">
        <p>Fetching...</p>
        {/* <BarLoader color="grey" width={250} /> */}
        <RingLoader color="grey" size={60} />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title.."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:flex text-xs flex-col items-center justify-center text-center text-muted-foreground pb-2">
          <Image
            src="/Empty-amico.png"
            height={220}
            width={220}
            alt="Emtpy search"
          />
          No documents found
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
          >
            <span className="truncate pl-2 ">{doc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, doc._id)}
                role="button"
                className="rounded-sm p-1 m-1 hover:bg-neutral-200"
              >
                <Undo className="h-4 w-4 text-muted-foreground text-green-600" />
              </div>
              <ConfirmModal onConfirm={()=> onRemove(doc._id)} >

              <div
                className="rounded-sm p-1 m-1 hover:bg-neutral-200"
                role="button"
                >
                {" "}
                <Trash className=" text-red-600 h-4 w-4 text-muted-foreground" />
              </div>
                </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
