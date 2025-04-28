export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

export const responseFromUser = ({user, preferences}) => {
    const categoryNames=preferences.map(preference=>preference.name);

    return {
        memberId: user[0].id,
        name: user[0].name,
        email: user[0].email,
        preferences: categoryNames,
    };
};