const EditBusinessModal = ({ isOpen, onClose, business, onSave }) => {
    const [formData, setFormData] = useState(business || {});

    useEffect(() => {
        setFormData(business || {});
    }, [business]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[400px]">
                <h3 className="text-lg font-bold mb-4">Edit Business</h3>

                {["businessName", "businessEmail", "businessType", "ownerName", "ownerPhoneNumber"].map(field => (
                    <div key={field} className="mb-3">
                        <label className="block text-sm font-medium mb-1">{field}</label>
                        <input
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};
