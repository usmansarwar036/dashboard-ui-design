import { useState } from "react";
import { Pencil, Facebook, Twitter, Linkedin, Instagram, Link } from "lucide-react";

const ProfilePage = () => {
    const initialInfo = {
        profileImage: "/src/assets/profile-image.jpg",
        firstName: "Chowdury",
        lastName: "Musharof",
        email: "randomuser@pimjo.com",
        phone: "+09 363 398 46",
        bio: "Team Manager",
        social: {
            facebook: "https://facebook.com",
            x: "https://x.com",
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
        },
        address: {
            country: "United States",
            cityState: "Arizona, United States.",
            postalCode: "ERT 2489",
            taxId: "AS4568384",
        },
    };

    const [updatedInfo, setUpdatedInfo] = useState(initialInfo);
    const [showSociallModal, setShowSociallModal] = useState(false);
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const handleSave = (type, data) => {
        if (type === "personal") {
            setUpdatedInfo(data);
            setShowPersonalModal(false);
        } else {
            setUpdatedInfo((prev) => ({
                ...prev,
                [type]: data,
            }));
            if (type === "social") setShowSociallModal(false);
            else if (type === "address") setShowAddressModal(false);
        }
        console.log("Saving data:", updatedInfo);
    };

    return (
        <div className="mx-auto max-w-screen-2xl">
            {/* Header */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Profile</h2>
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        <li>
                            <Link
                                to="/dashboard/"
                                className="dark:bg-dark/[0.03] inline-flex items-center gap-1.5 text-gray-500 dark:border-gray-800 dark:text-white"
                            >
                                Home <span className="text-gray-400">/</span>
                            </Link>
                        </li>
                        <li className="text-gray-800 dark:text-white/90">Profile</li>
                    </ol>
                </nav>
            </div>
            <div className="mb-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
                        <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
                            <img
                                src={initialInfo.profileImage}
                                alt="user"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 dark:text-white/90 xl:text-left">
                                {initialInfo.lastName} {initialInfo.firstName}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{initialInfo.bio}</p>
                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{initialInfo.address.cityState}</p>
                            </div>
                        </div>
                        <div className="order-2 flex grow items-center gap-2 xl:order-3 xl:justify-end">
                            {Object.entries(initialInfo.social).map(([platform, url]) => {
                                if (!url) return null;
                                const Icon = {
                                    facebook: Facebook,
                                    x: Twitter,
                                    linkedin: Linkedin,
                                    instagram: Instagram,
                                }[platform];
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSociallModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
                    >
                        <Pencil size={18} />
                        Edit
                    </button>
                </div>
            </div>

            {/* Personal Info */}
            <div className="mb-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">Personal Information</h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 lg:gap-x-32 2xl:gap-x-32">
                            {[
                                ["First Name", initialInfo.firstName],
                                ["Last Name", initialInfo.lastName],
                                ["Email address", initialInfo.email],
                                ["Phone", initialInfo.phone],
                                ["Bio", initialInfo.bio],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{label}</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowPersonalModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
                    >
                        <Pencil size={18} />
                        Edit
                    </button>
                </div>
            </div>

            {/* Address */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">Address</h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 lg:gap-x-32 2xl:gap-x-32">
                            {[
                                ["Country", initialInfo.address.country],
                                ["City/State", initialInfo.address.cityState],
                                ["Postal Code", initialInfo.address.postalCode],
                                ["TAX ID", initialInfo.address.taxId],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{label}</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddressModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
                    >
                        <Pencil size={18} />
                        Edit
                    </button>
                </div>
            </div>

            {showPersonalModal && (
                <EditModal
                    title="Edit Personal Info"
                    data={updatedInfo}
                    onClose={() => setShowPersonalModal(false)}
                    onSave={(data) => handleSave("personal", data)}
                />
            )}
            {showSociallModal && (
                <EditModal
                    title="Edit Social Info"
                    data={updatedInfo.social}
                    onClose={() => setShowSociallModal(false)}
                    onSave={(data) => handleSave("social", data)}
                />
            )}

            {showAddressModal && (
                <EditModal
                    title="Edit Address Info"
                    data={updatedInfo.address}
                    onClose={() => setShowAddressModal(false)}
                    onSave={(data) => handleSave("address", data)}
                />
            )}
        </div>
    );
};

const EditModal = ({ title, data, onClose, onSave }) => {
    const [form, setForm] = useState(data);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-5 backdrop-blur">
            <div className="flex max-h-[80%] w-full max-w-xl flex-col rounded-3xl bg-white p-0 dark:bg-gray-900">
                {/* Header (fixed) */}
                <div className="sticky top-0 z-10 rounded-t-3xl border-b border-gray-200 bg-white px-6 pb-4 pt-6 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">{title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your information</p>
                </div>

                {/* Scrollable form section */}
                <div className="grid flex-1 grid-cols-1 gap-4 overflow-auto px-6 py-4 md:grid-cols-2">
                    {Object.entries(form).map(([key, value]) =>
                        key === "address" ? null : key === "social" ? null : (
                            <div key={key}>
                                <label className="mb-1 block text-sm font-medium capitalize text-gray-700 dark:text-gray-400">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                />
                            </div>
                        ),
                    )}
                </div>

                {/* Footer (fixed) */}
                <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-b-3xl border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
