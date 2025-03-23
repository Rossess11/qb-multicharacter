Config = {}
Config.Interior = vector3(129.56, -728.22, 254.15) -- Interior to load where characters are previewed
Config.DefaultSpawn = vector3(437.22, -625.62, 28.71) -- Default spawn coords if you have start apartments disabled
Config.PedCoords = vector4(133.75, -743.3, 254.15, 155.63) -- Create preview ped at these coordinates
Config.HiddenCoords = vector4(131.71, -744.31, 254.15, 306.29) -- Hides your actual ped while you are in selection
Config.CamCoords = vector4(133.05, -745.6, 254.50, 336.86) -- Camera coordinates for character preview screen
Config.EnableDeleteButton = false -- Define if the player can delete the character or not
Config.customNationality = false                                      -- Defines if Nationality input is custom of blocked to the list of Countries
Config.SkipSelection = false                                          -- Skip the spawn selection and spawns the player at the last location

Config.DefaultNumberOfCharacters = 1                               -- Define maximum amount of default characters (maximum 5 characters defined by default)
Config.PlayersNumberOfCharacters = {                                  -- Define maximum amount of player characters by rockstar license (you can find this license in your server's database in the player table)
    { license = 'license:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', numberOfChars = 2 },
}

