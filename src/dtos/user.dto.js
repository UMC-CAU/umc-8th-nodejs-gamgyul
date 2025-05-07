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
    const categoryNames=preferences.map(
      (preference) => preference.foodCategory.name
    );

    return {
        name: user.name,
        email: user.email,
        preferences: categoryNames,
    };
};

export const responseFromReveiws = ({user, reviews}) => {
  return {
      data: {
        reviews: reviews,
        member: user
      },
      pagination: {
          cursor: reviews.length ? reviews[reviews.length - 1].id : null
      },
  };
};