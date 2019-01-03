export const getToken = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const getClubId = () => {
    return  localStorage.getItem("clubId");
};
