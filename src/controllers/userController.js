import { ForbiddenError, ValidationError } from "../errors";
import { UserService } from "../services";
import {
  arePasswordsEqual,
  isValidProfileData,
  isValidSignupData,
} from "../utils/validators";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};

export const postUser = async (req, res, next) => {
  const { email, username, password, password2, name, location } = req.body;

  try {
    if (
      !isValidSignupData(email, username, password, password2, name, location)
    ) {
      throw new ValidationError("유효하지 않는 user 데이터입니다.", "join");
    }

    if (!arePasswordsEqual(password, password2)) {
      throw new ValidationError("비밀번호가 일치하지 않습니다.", "join");
    }
    const user = await UserService.existsUser(
      { $or: [{ username }, { email }] },
      true
    );
    if (user) {
      throw new ValidationError(
        "이미 존재하는 유저 이름 또는 이메일입니다.",
        "join"
      );
    }
    await UserService.registerUser({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });

export const getProfile = (req, res) => res.send("00 회원 정보 페이지입니다.");

export const getEdit = (req, res) => {
  res.render("edit-profile", { pageTitle: "프로필 수정" });
};

export const updateProfile = async (req, res, next) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    body: { email, username, name, location },
  } = req;
  try {
    if (id !== _id) {
      throw new ForbiddenError("해당 권한이 없습니다.", "edit-profile");
    }

    if (!isValidProfileData(email, username, name, location)) {
      throw new ValidationError(
        "유효하지 않는 profile 데이터입니다.",
        "edit-profile"
      );
    }

    let user = await UserService.existsUser(
      {
        $and: [{ _id: { $ne: _id } }, { $or: [{ username }, { email }] }],
      },
      true
    );
    if (user) {
      throw new ValidationError(
        "이미 존재하는 유저 이름 또는 이메일입니다.",
        "edit-profile"
      );
    }

    user = await UserService.getUserById(_id);
    if (user.socialOnly && user.email !== email) {
      throw new ValidationError(
        "SNS 로그인으로 가입한 유저는 이메일을 수정할 수 없습니다!",
        "edit-profile"
      );
    }

    const updatedUser = await UserService.updateProfile(_id, {
      email,
      username,
      name,
      location,
    });
    req.session.user = updatedUser.toSafeObject();
    return res.redirect("/users/edit");
  } catch (error) {
    next(error);
  }
};

export const remove = (req, res) => res.send("회원 정보 탈퇴페이지입니다.");
