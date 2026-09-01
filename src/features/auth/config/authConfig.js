function envAcc(raw, role){
    try{
        const parsed = JSON.parse(raw || '[]');
        return parsed.map((acc) => ({...acc, role}));
    } catch (err){
        console.error(`Gagal parse role ${role}: `, err);
        return [];
    }
}

export const ADMIN_ACC = envAcc(import.meta.env.VITE_ADMIN_ACCOUNTS, 'admin');
export const ORGANIZER_ACC = envAcc(import.meta.env.VITE_ORGANIZER_ACCOUNTS, 'organizer');

export const DEFAULT_ACC = [...ADMIN_ACC, ...ORGANIZER_ACC];