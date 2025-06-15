import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUsersSession,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'strict',
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'strict',
  });

  console.log('Set-Cookie headers:', res.getHeaders()['set-cookie']);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

export const refreshUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshUsersSession(sessionId, refreshToken);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'strict',
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'strict',
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
