

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY . .

# Start the server using the production buil
CMD [ "npm", "run", "dev" ]

