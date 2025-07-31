export const validateEmail = (email) => {
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (fullName) => {
    if (!fullName) return "";
    const names = fullName.split(" ");
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
}

export const addThousendsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, FractionalPart] = num.toString().split(".");
    const formatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return FractionalPart? `${formatedInteger}.${FractionalPart}` : formatedInteger;
}