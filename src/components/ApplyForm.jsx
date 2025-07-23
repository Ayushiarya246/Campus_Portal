import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function ApplyForm() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [form, setForm] = useState({
    name: '',
    roll: '',
    DOB: '',
    experience_in_years: '',
    resume: ''
  });
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser; // ✅ Assuming already logged in

  // ✅ Check if user already applied
  useEffect(() => {
    const checkAlreadyApplied = async () => {
      const docRef = doc(db, 'applications', companyId, 'submissions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setApplied(true);
      }
      setLoading(false);
    };

    checkAlreadyApplied();
  }, [companyId, user.uid]);

  // ✅ Validate input
  const validateForm = () => {
    const { name, roll, DOB, experience_in_years, resume } = form;

    if (!name.trim()) return alert('❌ Enter valid name.') || false;
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      alert('❌ Name should only contain letters (A-Z, a-z) and spaces.');
      return false;
    }
    if (!roll.trim()) return alert('❌ Enter roll number.') || false;
    if (!DOB) return alert('❌ Select date of birth.') || false;
    const exp = parseFloat(experience_in_years);
    if (isNaN(exp) || exp < 0) return alert('❌ Invalid experience.') || false;
    try {
      new URL(resume);
    } catch {
      return alert('❌ Invalid resume URL.') || false;
    }
    return true;
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const docRef = doc(db, 'applications', companyId, 'submissions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        alert("✅ You already applied.");
        setApplied(true);
      } else {
        await setDoc(docRef, {
          ...form,
          name: form.name.trim(),
          roll: form.roll.trim(),
          experience_in_years: parseFloat(form.experience_in_years),
          resume: form.resume.trim(),
          email: user.email,
          appliedAt: new Date()
        });
        alert("✅ Application submitted!");
        setApplied(true);
        navigate("/");
      }
    } catch (error) {
      alert("❌ Submission failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Loading
  if (loading) return <p className="text-center mt-8">⏳ Loading...</p>;

  // ✅ Already applied
  if (applied) return (
    <p className="text-center mt-8 text-green-600 font-bold">
      ✅ Already applied!
    </p>
  );

  // 🧾 Application form
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Apply to {companyId}</h2>

      <input
        type="text"
        required
        placeholder="Full Name"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        required
        placeholder="Roll Number"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, roll: e.target.value })}
      />
      <input
        type="date"
        required
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, DOB: e.target.value })}
      />
      <input
        type="number"
        required
        placeholder="Experience in Years"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, experience_in_years: e.target.value })}
      />
      <input
        type="url"
        required
        placeholder="Resume Link (Drive/URL)"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, resume: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export default ApplyForm;
