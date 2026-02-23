import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import Link from "next/link";
import { ContactLink, Profile, ProfileDetail } from "@domain/careers";
import EditSVG from "@assets/icons/edit.svg";
import PlusSVG from "@assets/icons/plus.svg";
import { useState } from "react";
import { MediaSource } from "@domain/media";
import Editable from "@components/ui/Edit/Editable/Editable";
import EditSingleMediaModal from "@components/ui/Edit/Modal/EditMedia/EditSingleMediaModal";
import EditContactModal from "@components/ui/Edit/Modal/EditContact/EditContactModal";

const CareerDetailProfile = ({
  profile,
  editable,
  updateProfile,
}: {
  profile: Profile;
  editable?: boolean;
  updateProfile?: (updater: (profile: ProfileDetail) => ProfileDetail) => void;
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const setAvatar = (avatar: MediaSource | null) => {
    updateProfile?.((prev) => ({ ...prev, avatar }));
  };

  const setBio = (bio: string) => {
    updateProfile?.((prev) => ({ ...prev, bio }));
  };

  const setContact = (index: number) => (contact: ContactLink) => {
    updateProfile?.((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c, i) => (i === index ? contact : c)),
    }));
  };

  const addContact = () => {
    updateProfile?.((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: "", value: "", href: "" }],
    }));
    setSelectedIndex(profile.contacts.length);
    setOpenContactModal(true);
  };

  const deleteContact = () => {
    updateProfile?.((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== selectedIndex),
    }));
    setOpenContactModal(false);
  };

  return (
    <div className={Styles.Container}>
      <div className={Styles.MediaContainer}>
        {profile.avatar ? (
          <>
            <MediaCard media={profile.avatar} className={Styles.Media} />
            {editable && (
              <button
                className={Styles.EditButton}
                onClick={() => setOpenEditModal(true)}
              >
                <EditSVG className={Styles.ButtonIcon} />
              </button>
            )}
          </>
        ) : (
          editable && (
            <label className={Styles.MediaEmptyContainer}>
              <button
                className={Styles.MediaAddButton}
                onClick={() => setOpenEditModal(true)}
              >
                <PlusSVG className={Styles.MediaAddButtonIcon} />
              </button>
            </label>
          )
        )}
      </div>

      <Editable
        mode="TEXT"
        value={profile.bio}
        onChange={setBio}
        editable={editable}
        placeholder="100% AI-gene..."
        className={Styles.Bio}
      />

      <div className={Styles.Contacts}>
        {profile.contacts.map((contact, idx) => (
          <div key={`CAREERS_DETAIL_${idx}`} className={Styles.ContactItem}>
            <span className={Styles.ContactName}>{contact.name}</span>
            <Link href={contact.href} className={Styles.ContactValue}>
              {contact.value}
            </Link>
            {editable && (
              <button
                className={Styles.ContactEditButton}
                onClick={() => {
                  setSelectedIndex(idx);
                  setOpenContactModal(true);
                }}
              >
                <EditSVG />
              </button>
            )}
          </div>
        ))}
        {editable && (
          <button className={Styles.ContactAddButton} onClick={addContact}>
            <PlusSVG />
          </button>
        )}
      </div>

      <EditSingleMediaModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        initial={profile.avatar}
        applyMedia={setAvatar}
        blockedTypes={["VIDEO"]}
      />
      <EditContactModal
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
        initial={profile.contacts[selectedIndex ?? 0]}
        applyContact={setContact(selectedIndex ?? 0)}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default CareerDetailProfile;
