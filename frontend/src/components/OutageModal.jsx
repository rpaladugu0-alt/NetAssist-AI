import Modal from './Modal';
import OutageLookup from './OutageLookup';

export default function OutageModal({
  open,
  areas,
  disclaimer,
  selectedAreaId,
  onSelect,
  onClose,
}) {
  if (!open) return null;

  return (
    <Modal title="Charlotte-area outage lookup" labelledBy="outage-title" onClose={onClose}>
      <OutageLookup
        areas={areas}
        disclaimer={disclaimer}
        selectedAreaId={selectedAreaId}
        onSelect={onSelect}
      />
    </Modal>
  );
}
