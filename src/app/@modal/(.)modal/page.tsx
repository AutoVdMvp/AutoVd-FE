"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/modal";
import { ExampleModalContent } from "@/widgets/modal/example";

export default function ModalPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <ExampleModalContent />
    </Modal>
  );
}
