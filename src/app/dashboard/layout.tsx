// This is the layout specific to the dashboard part of the application.

import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>

      {children}
    </section>
  );
};

export default DashboardLayout;
