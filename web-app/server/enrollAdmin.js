/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

// capture network variables from config.json
//const configPath = path.join(process.cwd(), './config.json');
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

// let connection_file = config.connection_file;
let appAdmin = config.appAdmin;
let appAdminSecret = config.appAdminSecret;
let orgMSPID = config.orgMSPID;
let caName = config.caName;

//const ccpPath = path.join(process.cwd(), './www/blockchain/ibpConnection.json');
const ccpPath = path.join(process.cwd(), './connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

console.log(ccp.certificateAuthorities['ca.org1.example.com']);

async function main() {
  try {

    const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    // Create a new CA client for interacting with the CA.
    const caURL = caName;
    // const ca = new FabricCAServices(caURL);
    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

    console.log('CAServer: ', ca);

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin);
    if (adminExists) {
      console.log('An identity for the admin user "admin" already exists in the wallet');
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({ enrollmentID: appAdmin, enrollmentSecret: appAdminSecret });
    const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
    wallet.import(appAdmin, identity);
    console.log('msg: Successfully enrolled admin user ' + appAdmin + ' and imported it into the wallet');

  } catch (error) {
    console.log('CAServer: ', caName);
    console.error(`Failed to enroll admin user ' + ${appAdmin} + : ${error}`);
    process.exit(1);
  }
}

main();
