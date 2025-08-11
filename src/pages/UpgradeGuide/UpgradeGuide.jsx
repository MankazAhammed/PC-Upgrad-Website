import React from "react";

const UpgradeGuide = () => {
  return (
    <div
      className="upgrade-guide"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}
    >
      <h1>Upgrade Guide</h1>

      <p>
        This step-by-step guide will help you plan a compatible and
        cost-effective PC hardware upgrade.
      </p>

      <h2>Step 1: Identify Your Current Hardware</h2>
      <p>
        Make a note of your current components: CPU, motherboard, RAM, GPU, PSU,
        and case size.
      </p>

      <h2>Step 2: Define Your Goals</h2>
      <ul>
        <li>Gaming, productivity, video editing, etc.</li>
        <li>Desired performance level (basic, mid-range, high-end)</li>
        <li>Budget limitations</li>
      </ul>

      <h2>Step 3: Start Compatibility Planning</h2>
      <p>
        Determine what component you want to upgrade first. For example,
        upgrading your CPU might also require a new motherboard and RAM if
        socket or chipset compatibility has changed.
      </p>

      <h2>Step 4: Use the Compatibility Tool</h2>
      <p>
        Our tool (coming soon) will help check if your chosen components are
        compatible with your existing system or new components you're
        considering.
      </p>

      <h2>Step 5: Review Budget Recommendations</h2>
      <p>
        The tool will eventually allow filtering upgrades based on your total
        budget — ensuring performance per dollar is maximized.
      </p>

      <h2>Step 6: Finalize and Save Your Build</h2>
      <p>
        Once you've validated compatibility, save or export your upgrade plan.
        You can compare multiple configurations or consult with experts using
        your build sheet.
      </p>
    </div>
  );
};

export default UpgradeGuide;
