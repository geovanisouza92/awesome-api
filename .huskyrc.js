const tasks = (...tasks) => tasks.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks(
      "lint-staged",
      "git add",
    ),
  },
};
