import User from '../model/User.js';
// import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

export const registerUserCtrl = async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.json({
      msg: 'Tài khoản đã tồn tại',
    });
    // throw new Error("User already exists");
  } else {
    //hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await User.create({
      fullname,
      email,
      // password: hashedPassword,
      password,
      isAdmin: true,
    });
    res.status(201).json({
      status: 'success',
      message: 'Đăng ký thành công',
      data: user,
    });
  }
  return;
};

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    email,
  });

  if (userFound && (await (password === userFound?.password))) {
    res.json({
      status: 'Success',
      msg: 'Đăng nhập thành công',
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error('Thông tin đăng nhập chưa chính xác');
  }
  return;
});

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId).populate('orders');
  res.json({
    status: 'success',
    message: 'Lấy thông tin cá nhân thành công',
    user,
  });
});

export const updateShippingAddressCtrl = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, phone } =
    req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  res.json({
    status: 'success',
    message: 'Cập nhật địa chỉ giao hàng thành công',
    user,
  });
});
