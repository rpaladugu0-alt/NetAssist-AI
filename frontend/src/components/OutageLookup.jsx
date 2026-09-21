const STATUS_CLASS = {
  operational: 'status-ok',
  degraded: 'status-warn',
  outage: 'status-bad',
};

export default function OutageLookup({
  areas = [],
  selectedAreaId,
  onSelect,
  disclaimer,
}) {
  const selected = areas.find((area) => area.id === selectedAreaId) || areas[0];

  function handleTabKeyDown(event, index) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === 'ArrowRight'
        ? (index + 1) % areas.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + areas.length) % areas.length
          : event.key === 'Home'
            ? 0
            : areas.length - 1;

    const nextArea = areas[nextIndex];
    if (nextArea) {
      onSelect(nextArea.id);
      const nextTab = document.getElementById(`outage-tab-${nextArea.id}`);
      nextTab?.focus();
    }
  }

  if (!selected) return null;

  return (
    <section className="outage-lookup" aria-label="Regional outage lookup">
      <div className="outage-lookup-head">
        <div>
          <h3>ClearWave Regional Outage Lookup</h3>
          <p>Select your service area to check network operational status</p>
        </div>
        <span className="demo-banner">Prototype / Demo Data</span>
      </div>

      <p className="sr-only">Select ClearWave service area</p>
      <div className="outage-tabs" role="tablist" aria-label="Outage regions">
        {areas.map((area, index) => (
          <button
            key={area.id}
            id={`outage-tab-${area.id}`}
            type="button"
            role="tab"
            aria-selected={area.id === selected.id}
            aria-controls={`outage-panel-${area.id}`}
            tabIndex={area.id === selected.id ? 0 : -1}
            className={`outage-tab ${STATUS_CLASS[area.status]} ${area.id === selected.id ? 'is-active' : ''}`}
            onClick={() => onSelect(area.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <span className="status-dot" aria-hidden="true" />
            {area.name}
            <small>{area.statusLabel}</small>
          </button>
        ))}
      </div>

      <dl className="outage-detail" id={`outage-panel-${selected.id}`} role="tabpanel" aria-label={`${selected.name} outage status`}>
        <div>
          <dt>Service Area</dt>
          <dd>{selected.name}</dd>
        </div>
        <div>
          <dt>Service Status</dt>
          <dd className={STATUS_CLASS[selected.status]}>{selected.statusLabel}</dd>
        </div>
        <div>
          <dt>Estimated Restoration</dt>
          <dd>{selected.estimatedRestoration}</dd>
        </div>
        <div>
          <dt>Last Updated</dt>
          <dd>{selected.lastUpdated}</dd>
        </div>
        <div className="full">
          <dt>Telemetry Details</dt>
          <dd>{selected.details}</dd>
        </div>
        <div className="full">
          <dt>Customer Impact</dt>
          <dd>{selected.impact}</dd>
        </div>
      </dl>

      <p className="demo-note">{disclaimer}</p>
    </section>
  );
}
