const { Op } = require("sequelize");

const { chatStreamClient } = require("../utils/streamChatUtil");

const {
  handleSuccess,
  handleServerError,
} = require("../helpers/handleResponseHelper");

const { User } = require("../models");

exports.token = async (req, res) => {
  try {
    const { id } = req;
    const token = chatStreamClient.createToken(id.toString());
    return handleSuccess(res, { token: token });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createChannels = async (req, res) => {
  try {
    const { id } = req;
    const { userId } = req.body;

    const channel = chatStreamClient.channel("messaging", `${id}-${userId}`, {
      members: [id.toString(), userId.toString()],
      created_by_id: id.toString(),
    });
    await channel.create();

    return handleSuccess(res, { message: "Created channel" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getUsersAvailableMessage = async (req, res) => {
  try {
    const { id } = req;
    const channels = await chatStreamClient.queryChannels({
      members: { $in: [id.toString()] },
    });

    const membersList = channels.reduce((acc, channel) => {
      const members = channel.state.members;
      acc.push(...Object.keys(members));
      return acc;
    }, []);

    const uniqueMembersList = membersList.filter(
      (member) => member !== id.toString()
    );
    const responseUser = await chatStreamClient.queryUsers({
      id: { $nin: [id.toString()] },
      role: { $in: ["user"] },
    });

    const usersIdList = responseUser.users
      .filter((val) => !uniqueMembersList.includes(val.id))
      .map((val) => parseInt(val.id));

    const users = await User.findAll({
      where: { id: { [Op.in]: usersIdList } },
    });
    return handleSuccess(res, {
      data: users.map((val) => {
        delete val.dataValues.password;
        return val;
      }),
    });
  } catch (error) {
    return handleServerError(res);
  }
};
