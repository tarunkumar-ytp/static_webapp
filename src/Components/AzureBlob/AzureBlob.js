import { BlobServiceClient } from "@azure/storage-blob";
import { useState } from "react";
const sasToken =
  process.env.storagesastoken ||
  "?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-12-19T20:49:19Z&st=2022-12-19T12:49:19Z&spr=https&sig=LWpJ%2FkC%2F%2BojG%2FY%2FP%2FFcg1d%2F2sOr2k2KezKmV13qvQGw%3D"; // Fill string with your SAS token
const containerName = `ytp-test-container`;
const storageAccountName =
  process.env.storageresourcename || "ytpteststorageaccount"; // Fill string with your Storage resource name
  

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !(!storageAccountName || !sasToken);
};

// return list of blobs in container to display
 const getBlobsInContainer = async (containerClient) => {
  const returnedBlobUrls = [];
  const resultData = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat({
    includeMetadata: true,
  })) {
    // if image is public, just construct URL

    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
   
   
  }

  return returnedBlobUrls;
};

export const blobData = async ()=> {
return await getBlobsInContainer(containerClient);
}


const createBlobInContainer = async (containerClient, file) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload filecreateBlobInContainer
  await blobClient.uploadBrowserData(file, options);
};

const uploadFileToBlob = async (file) => {
  if (!file) return [];

  
  // upload file
  await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export const checkfileexists = async () => {
  // blobService.GetBlo
  // let test = blobService.findBlobsByTags()
  const test = blobService.findBlobsByTags('SSI_Spot_Index_Sample Data_Feb_01062023.xlsx')
  console.log("test : ", test)
  // await blobService.doesBlobExist(containerClient, 'SSI_Spot_Index_Sample Data_Feb_01062023.xlsx', function(error, result) {
  //   if (!error) {
  //     if (result.exists) {
  //       console.log('Blob exists...');
  //     } else {
  //       console.log('Blob does not exist...');
  //     }
  //   }
  // });
}

export default uploadFileToBlob;