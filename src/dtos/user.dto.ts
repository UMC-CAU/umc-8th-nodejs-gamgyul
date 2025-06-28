import { FoodCategory, UserFavorCategory, Member, Review } from "@prisma/client";

export interface UserCreateInput {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  preferences: number[];
}

export const bodyToUser = (body: UserCreateInput) => {
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

export const responseFromUser = ({
  user,
  preferences
}: {
  user: Member | null;
  preferences: (UserFavorCategory & { foodCategory: FoodCategory })[];
}) => {
    const categoryNames=preferences.map(
      (preference) => preference.foodCategory.name
    );

    return {
        name: user!.name,
        email: user!.email,
        preferences: categoryNames,
    };
};

type ReviewResponseDto = {
  id: number;
  description: string;
  starPoint: number;
  store: {
    id: number;
    name: string;
  };
};

export const responseFromReveiws = ({
  reviews
}: {
  reviews: ReviewResponseDto[];
}) => {
  return {
      data: {
        reviews: reviews,
      },
      pagination: {
          cursor: reviews.length ? reviews[reviews.length - 1].id : null
      },
  };
};