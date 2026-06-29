import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const CertificationsForm: React.FC = () => {
  const { resumeData, updateCertification, addCertification, removeCertification } = useResume();
  const { certifications } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCertification(id, { [name]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      {certifications.map((cert, index) => (
        <div key={cert.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
          <button
            onClick={() => removeCertification(cert.id)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove Certification"
          >
            <Trash2 size={18} />
          </button>

          <h4 className="text-sm font-semibold text-gray-700 mb-3">Certification {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={cert.name}
                onChange={(e) => handleChange(cert.id, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="AWS Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
              <input
                type="text"
                name="issuer"
                value={cert.issuer}
                onChange={(e) => handleChange(cert.id, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="month"
                name="date"
                value={cert.date}
                onChange={(e) => handleChange(cert.id, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (optional)</label>
              <input
                type="url"
                name="url"
                value={cert.url || ''}
                onChange={(e) => handleChange(cert.id, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
      >
        <Plus size={18} />
        Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;
