import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTIxNTUzMzgwMTE2MjQxNjE2OA.G8i_jC.vpXM9EGgGJIqtkoPQ2RylGeRObWzLfXeHSlwsc"
);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands("1215533801162416168"), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
