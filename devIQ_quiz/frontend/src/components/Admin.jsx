import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className="container py-5">
      <div className="text-center">
        <h2 className="mb-4">Admin Dashboard</h2>
        <div className="d-grid gap-2">
          <Link to="/create-quiz" className="btn btn-primary mb-2">
            Create a New Quiz
          </Link>
          <Link to="/all-quizzes" className="btn btn-secondary">
            Manage Existing Quizzes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
