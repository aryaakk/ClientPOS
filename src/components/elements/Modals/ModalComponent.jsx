import { Modal } from "antd";

const ModalComponent = ({
  title,
  children,
  centered,
  isOpenModal,
  onOk,
  onCancel,
  footer,
}) => {
  return (
    <Modal
      title={title}
      centered={centered}
      open={isOpenModal}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
