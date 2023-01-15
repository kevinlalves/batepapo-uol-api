import chalk from "chalk";

export function createError(resource, error, res) {
  console.log(chalk.red(`Error writing data to ${resource} collection`));
  console.log(error);
  res.status(500).send(`Could not create ${resource}`);
}

export function showError(resource, error, res) {
  console.log(chalk.red(`Error getting data from ${resource} collection`));
  console.log(error);
  res.status(500).send(`Could not get ${resource}`);
}

export function updateError(resource, error, res) {
  console.log(chalk.red(`Error updating data in ${resource} collection`));
  console.log(error);
  res.status(500).send(`Could not update ${resource}`);
}

export function deleteError(resource, error, res) {
  console.log(chalk.red(`Error erasing data from ${resource} collection`));
  console.log(error);
  res.status(500).send(`Could not delete ${resource}`);
}
