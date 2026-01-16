// Common timezones list for reuse across the application
export const timezones = [
    { value: 'Africa/Abidjan', label: 'Africa/Abidjan' },
    { value: 'Africa/Accra', label: 'Africa/Accra' },
    { value: 'Africa/Addis_Ababa', label: 'Africa/Addis_Ababa' },
    { value: 'Africa/Algiers', label: 'Africa/Algiers' },
    { value: 'Africa/Cairo', label: 'Africa/Cairo' },
    { value: 'Africa/Johannesburg', label: 'Africa/Johannesburg' },
    { value: 'Africa/Lagos', label: 'Africa/Lagos' },
    { value: 'Africa/Nairobi', label: 'Africa/Nairobi' },
    { value: 'America/Anchorage', label: 'America/Anchorage' },
    { value: 'America/Argentina/Buenos_Aires', label: 'America/Argentina/Buenos_Aires' },
    { value: 'America/Bogota', label: 'America/Bogota' },
    { value: 'America/Caracas', label: 'America/Caracas' },
    { value: 'America/Chicago', label: 'America/Chicago' },
    { value: 'America/Denver', label: 'America/Denver' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
    { value: 'America/Mexico_City', label: 'America/Mexico_City' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'America/Phoenix', label: 'America/Phoenix' },
    { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo' },
    { value: 'America/Toronto', label: 'America/Toronto' },
    { value: 'America/Vancouver', label: 'America/Vancouver' },
    { value: 'Asia/Bangkok', label: 'Asia/Bangkok' },
    { value: 'Asia/Dhaka', label: 'Asia/Dhaka' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai' },
    { value: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong' },
    { value: 'Asia/Jakarta', label: 'Asia/Jakarta' },
    { value: 'Asia/Karachi', label: 'Asia/Karachi' },
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
    { value: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur' },
    { value: 'Asia/Manila', label: 'Asia/Manila' },
    { value: 'Asia/Seoul', label: 'Asia/Seoul' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai' },
    { value: 'Asia/Singapore', label: 'Asia/Singapore' },
    { value: 'Asia/Taipei', label: 'Asia/Taipei' },
    { value: 'Asia/Tehran', label: 'Asia/Tehran' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
    { value: 'Atlantic/Azores', label: 'Atlantic/Azores' },
    { value: 'Atlantic/Reykjavik', label: 'Atlantic/Reykjavik' },
    { value: 'Australia/Adelaide', label: 'Australia/Adelaide' },
    { value: 'Australia/Brisbane', label: 'Australia/Brisbane' },
    { value: 'Australia/Melbourne', label: 'Australia/Melbourne' },
    { value: 'Australia/Perth', label: 'Australia/Perth' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney' },
    { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' },
    { value: 'Europe/Athens', label: 'Europe/Athens' },
    { value: 'Europe/Berlin', label: 'Europe/Berlin' },
    { value: 'Europe/Brussels', label: 'Europe/Brussels' },
    { value: 'Europe/Bucharest', label: 'Europe/Bucharest' },
    { value: 'Europe/Budapest', label: 'Europe/Budapest' },
    { value: 'Europe/Copenhagen', label: 'Europe/Copenhagen' },
    { value: 'Europe/Dublin', label: 'Europe/Dublin' },
    { value: 'Europe/Helsinki', label: 'Europe/Helsinki' },
    { value: 'Europe/Istanbul', label: 'Europe/Istanbul' },
    { value: 'Europe/Lisbon', label: 'Europe/Lisbon' },
    { value: 'Europe/London', label: 'Europe/London' },
    { value: 'Europe/Madrid', label: 'Europe/Madrid' },
    { value: 'Europe/Moscow', label: 'Europe/Moscow' },
    { value: 'Europe/Oslo', label: 'Europe/Oslo' },
    { value: 'Europe/Paris', label: 'Europe/Paris' },
    { value: 'Europe/Prague', label: 'Europe/Prague' },
    { value: 'Europe/Rome', label: 'Europe/Rome' },
    { value: 'Europe/Stockholm', label: 'Europe/Stockholm' },
    { value: 'Europe/Vienna', label: 'Europe/Vienna' },
    { value: 'Europe/Warsaw', label: 'Europe/Warsaw' },
    { value: 'Europe/Zurich', label: 'Europe/Zurich' },
    { value: 'Pacific/Auckland', label: 'Pacific/Auckland' },
    { value: 'Pacific/Fiji', label: 'Pacific/Fiji' },
    { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu' },
    { value: 'UTC', label: 'UTC' },
];

// Reusable Timezone Select Component
export const TimezoneSelect = ({ id, name, value, onChange, required = true, className = "" }) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={className || "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"}
        >
            {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                    {tz.label}
                </option>
            ))}
        </select>
    );
};
