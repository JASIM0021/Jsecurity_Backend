const { Device, Command, Video } = require("../models");

exports.deviceAllDetailsPost = async (req, res, next) => {
  const { info } = req.body;
  console.log("info", info);
  try {
    // const saveDevice= await Device.create({where:{uid:req?.body?.id,device:info}})
    const findDevice = await Device.findOne({ where: { uid: req?.body?.uid } });
    console.log("findDevice", findDevice);
    if (findDevice) {
      const updateDevice = await Device.update({
        where: { uid: req?.body?.uid },
        device: info,
      });
    }
    const saveDevice = await Device.create({
      uid: req?.body?.uid,
      device: info,
    });
  } catch (error) {
    console.log("error", error);
  }
  res.status(200).json({
    message: "success",
    device: saveDevice,
  });
};
exports.deviceAllDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const deviceDetails = await Device.findOne({ where: { uid: id } });
    if (deviceDetails) {
      res.status(200).json({
        deviceDetails,
      });
    } else {
      res.status(200).json({
        message: "Device not found",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
exports.deviceCommand = async (req, res, next) => {
  const { cmdId, call, message, music, tourch, location } = req.body;

  try {
    const findExisting = await Command.findOne({ where: { cmdId } });
    console.log("findExisting", findExisting);
    let command;
    if (findExisting) {
      command = await Command.update(req?.body, { where: { cmdId } });
      return res.status(200).json({
        msg: "Commend updated Success",
        findExisting,
      });
    } else {
      command = await Command.create(req.body);
    }
    return res.status(200).json({
      msg: "Commend Changed Success",
      command,
    });
  } catch (error) {
    console.log("error", error);
  }
};
exports.getCommand = async (req, res) => {
  try {
    const command = await Command.findOne({
      where: { cmdId: req.params.cmdId },
    });
    if (command) {
      return res.status(200).json({
        msg: "Command Is Here",
        command,
      });
    } else {
      return res.status(200).json({
        msg: "Command not Found",
        statusCode: 401,
      });
    }
  } catch (error) {
    return res.status(200).json({
      msg: "Somthing went wrong",
      statusCode: 501,
    });
  }
};
exports.vUpload = async (req, res) => {
  const { vId } = req.body;
  const { filename, path } = req.file;
  try {
    const findVideo = await Video.findOne({ vId: vId });
    if (findVideo) {
      const video = await Video.update({ filename, path }, { where: { vId } });

      return res.status(200).json({
        msg: "Vieo updated success",
      });
    } else {
      await Video.create({ filename, path })
        .then((video) => {
          console.log("Video saved:", video);
          return res.json({ message: "Video uploaded successfully" });
        })
        .catch((err) => {
          console.error("Error saving video:", err);
          res.status(500).json({ error: "Failed to upload video" });
        });
    }
  } catch (error) {
    console.log("error", error);
  }
};
