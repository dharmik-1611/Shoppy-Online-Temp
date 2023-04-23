const Errorhandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../model/userModel.js');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password, avatar: {
            public_id: "this is a sample id",
            url: "profileurl"
        }
    });
    sendToken(user, 201, res);
});
//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new Errorhandler("Please Enter email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new Errorhandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new Errorhandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});
//Log out User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "User logged out"
    })
});

//Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new Errorhandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;


    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new Errorhandler(error.message, 500));
    }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new Errorhandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new Errorhandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});


//Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
})

//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new Errorhandler("old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new Errorhandler("password doesn't match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

//update user profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    //add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true
    });
});

//Get all users by admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    })
})

//Get single user Detail (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new Errorhandler(`User Does not exist with Id :${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user,
    })
})

//update user role -- Admin
exports.updateUserRoleByAdmin = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user1 = await User.findById(req.params.id);
    if (!user1) {
        return next(new Errorhandler(`user does not exist with id ${req.params.id}`, 400));
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true
    });
});

//Delete User _--Admin
exports.deleteUserByAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new Errorhandler(`user does not exist with id ${req.params.id}`, 400));
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "user deleted successfully",
    });
});